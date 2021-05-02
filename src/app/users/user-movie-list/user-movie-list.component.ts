import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/movies/movie.model';

import { User } from '../user.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit {

  userId: string;
  movieList: Movie[];
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
  }

}
