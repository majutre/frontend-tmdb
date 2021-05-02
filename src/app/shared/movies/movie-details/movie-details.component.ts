import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: number;
  selectedMovie: Movie;
  imgUrl: string = 'https://image.tmdb.org/t/p/w200/'

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params['id'];
        
    if (this.movieId) {
      this.getDetails(this.movieId);
    };
  }

  getDetails(id: number) {
    this.movieService.getMovieDetails(id)
      .subscribe(
        response => this.selectedMovie = response
      );
  }
}
