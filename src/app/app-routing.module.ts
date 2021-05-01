import { LoginComponent } from './core/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './users/user-form/user-form.component';
import { UserMovieListComponent } from './users/user-movie-list/user-movie-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'cadastro', children: 
    [
      { path: '', component: UserFormComponent },
      { path: 'editar/:id', component: UserFormComponent },
    ]
  },
  { path: 'usuario', component: UserMovieListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
