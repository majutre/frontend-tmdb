import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';

import { LoginComponent } from './core/auth/login/login.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserMovieListComponent } from './users/user-movie-list/user-movie-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'cadastro', children: 
    [
      { path: '', component: UserFormComponent },
      { path: 'editar/:id', component: UserFormComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'usuario', component: UserMovieListComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
