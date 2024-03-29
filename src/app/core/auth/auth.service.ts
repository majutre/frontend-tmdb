import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { AuthData } from './auth-data.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.backend_url + 'users/';
@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient,
                private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(user) {
        const authData: AuthData = { email: user.userEmail, cpf: user.userCpf };
        this.http.post(BACKEND_URL + 'signup', authData)
        .subscribe(() => {
                this.router.navigate['/login'];
            }, 
            error => {
                this.authStatusListener.next(false);
            });  
        }

    login(email: string, cpf: string) {
        const authData: AuthData = { email: email, cpf: cpf }
    
        this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + 'login', authData)
            .subscribe(
                response => {
                    const token = response.token;
                    this.token = token;
                    if (token) {
                        const expiresInDuration = response.expiresIn;

                        this.setAuthTimer(expiresInDuration);
                        this.isAuthenticated = true;
                        this.userId = response.userId;
                        this.authStatusListener.next(true);

                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

                        this.saveAuthData(token, expirationDate, this.userId);
                        this.router.navigate(['/usuario']);
                    }
                },
                error => {
                    this.authStatusListener.next(false);
                }
            );
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();
        const now = new Date();
        const expiresIn = authInfo.expirationDate.getTime() - now.getTime();

        if (!authInfo) {
            return;
        }

        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.userId = authInfo.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.userId = null;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number){
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    //Local Storage
    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');

        if (!token || !expirationDate || !userId) {
            return;
        }
        
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    }
}

