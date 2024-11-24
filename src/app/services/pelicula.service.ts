import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private baseUrl: string = 'https://api.themoviedb.org/3/movie/now_playing';
  private apiKey: string = '8b20d78728b45c912d0ecf5d761b98d4';

  constructor(private http: HttpClient) {}

  getNowPlaying(language: string = 'es-ES', page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('language', language)
      .set('page', page.toString())
      .set('api_key', this.apiKey);

    return this.http.get(this.baseUrl, { params });
  }

}
