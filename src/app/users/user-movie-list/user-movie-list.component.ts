import { Component, OnInit } from '@angular/core';


import { Movie } from 'src/app/shared/movies/movie.model';

import { MovieService } from './../../shared/movies/movie.service';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit {

  userId: string;
  movieIdList: number[] = [];
  movieList: Movie[];
  selected: any;
  imgUrl: string = 'https://image.tmdb.org/t/p/w200/';
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  
  constructor(private authService: AuthService, 
              private userService: UserService,
              private movieService: MovieService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userService.getMovieListByUserId(this.userId).subscribe((list: number[]) => {
      this.movieIdList = list;
      this.getList(this.movieIdList);
    });
    this.movieList = this.movieService.getMovies();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId();
      });
  }
  
  
  getDetails(id: number) {
    this.movieService.getDetailsAndPush(id);
  }

  getList(idList: number[]) {
    idList.forEach(id => {
      this.getDetails(id);
    });
  }
 
  onGetDetails(id: number) {
    this.movieService.getMovieDetails(id);
    this.router.navigate(['/filmes/', id]);
  }

  onDeleteMovie(id: number){
    console.log(id);
    
  }
}
