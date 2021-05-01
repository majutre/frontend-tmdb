import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth/auth-interceptor';

import { UserFormComponent } from './users/user-form/user-form.component';
import { UserMovieListComponent } from './users/user-movie-list/user-movie-list.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { LoginComponent } from './core/auth/login/login.component';
import { MovieListComponent } from './shared/movies/movie-list/movie-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserMovieListComponent,
    NavBarComponent,
    LoginComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
