import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/shared/movies/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[] = [];
  url: string = environment.api_url;
  searchUrl: string = environment.api_searchUrl;
  apiKey: string = environment.api_key;

  // private moviesUpdated = new Subject<Movie[]>();
  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.url}/popular?api_key=${this.apiKey}`)
  }

  getMovieDetails(movie_id): Observable<any> {
    return this.http.get(`${this.url}/${movie_id}?api_key=${this.apiKey}`)
  }

  searchMovies(query, page?): Observable<any> {
    let params = new HttpParams();
    params = params.append('query', query);
    if (page) {
      params = params.append('page', page);
    }
    return this.http.get(`${this.searchUrl}?api_key=${this.apiKey}`, { params: params })
  }

  addMovie(movieId: number, userId: string) {
    console.log(movieId);

    this.http
      .post<{ movieId: number, userId: string }>('http://localhost:3000/api/movies/' + userId, movieId)
      .subscribe((resData) => {
        console.log(resData.movieId);
      });

  }
}

