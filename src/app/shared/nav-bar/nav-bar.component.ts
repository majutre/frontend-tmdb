import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../core/auth/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  userId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userId = this.authService.getUserId();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
