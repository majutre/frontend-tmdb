import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private authStatusSubs: Subscription;

  constructor(public authService: AuthService) { }
  
  ngOnInit(): void {
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe();
  }
  
  onLogin(form: NgForm){
    if (form.invalid){
      return;
    }
    this.authService.login(form.value.email, form.value.cpf);
    form.reset();
  }
  
  ngOnDestroy(): void {
    this.authStatusSubs.unsubscribe();
  }
}
