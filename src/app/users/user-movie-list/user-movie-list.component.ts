import { UserService } from './../user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit {

  users: User[] = [];
  constructor(private service: UserService) { }

  ngOnInit() {
   
  }

}
