import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

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
      .get<User[]>('http://localhost:3000/api/users');
  }

  getUser(id: string){
    return this.http.get<User>('http://localhost:3000/api/users/' + id);
  }
 
  addUser(user: User){
    this.http
      .post<{message: string, userId: string}>('http://localhost:3000/api/users/signup', user)
      .subscribe((resData) => {
        console.log(resData.message);       
      });
  }

  editUser(user: User) {
    this.http.put('http://localhost:3000/api/users' + user._id, user);
  }

  deleteUser(id: string){
    this.http.delete<void>('http://localhost:3000/api/users/' + id).subscribe(() => {
      console.log('User deleted.');
    });
  }

  getMovieListByUserId(id: string) {
    return this.http.get('http://localhost:3000/api/movies/list/' + id);
  }
  // getMovieUpdateListener() {
  //   return this.moviesUpdated.asObservable();
  // }
}
