import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.backend_url + 'users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  // private movies: Movie[] = [];
  // private moviesUpdated = new Subject<Movie[]>();

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http
      .get<User[]>(BACKEND_URL);
  }

  getUser(id: string){
    return this.http.get<User>(BACKEND_URL + id);
  }
 
  addUser(user: User){
    this.http
      .post<{ message: string, userId: string }>(BACKEND_URL, user)
      .subscribe((resData) => {
        console.log(resData.message);       
      });
  }

  editUser(user: User) {
    this.http.put(BACKEND_URL + user._id, user);
  }

  deleteUser(id: string){
    this.http.delete<void>(BACKEND_URL + id).subscribe(() => {
      console.log('User deleted.');
    });
  }

  getMovieListByUserId(id: string) {
    return this.http.get(environment.backend_url + 'movies/list/' + id);
  }
  // getMovieUpdateListener() {
  //   return this.moviesUpdated.asObservable();
  // }
}
