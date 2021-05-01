import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient,
                private router: Router) {}

    getToken(){
        return this.token;
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(user) {
        const authData: AuthData = { email: user.userEmail, cpf: user.userCpf };
        this.http.post('http://localhost:3000/api/users/signup', authData)
            .subscribe(data => {
                console.log(data);
            });
    }

    login(email: string, cpf: string) {
        const authData: AuthData = { email: email, cpf: cpf }
    
        this.http.post<{token: string}>('http://localhost:3000/api/users/login', authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/usuario']);
                }
            });
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
    }
}

