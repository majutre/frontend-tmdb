import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './users/user-form/user-form.component';
import { UserMovieListComponent } from './users/user-movie-list/user-movie-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UserMovieListComponent },
  {
    path: 'cadastro', children: [
      { path: '', component: UserFormComponent },
      { path: 'editar/:id', component: UserFormComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
