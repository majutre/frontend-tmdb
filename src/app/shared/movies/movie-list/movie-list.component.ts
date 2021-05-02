import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';

import { MovieService } from '../movie.service';
import * as movieList from '../../../mock-db/db.json'
import { Movie, MoviePopular } from './../movie.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  userIsAuthenticated = false;
  movies: Movie[] = [];
  imgUrl: string = 'https://image.tmdb.org/t/p/w200/'
  userId: string;
  
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService,
              private movieService: MovieService,
              private router: Router) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.movieService.getPopularMovies()
      .subscribe((data: MoviePopular) => {
        this.movies = data.results;
        console.log('movies: ', this.movies);
        
      })
  }

  onAddMovie(id: number) {
    this.movieService.addMovie(id, this.userId);
  }

  onGetDetails(id: number) {
    this.movieService.getMovieDetails(id);
    this.router.navigate(['/filmes/', id]);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
