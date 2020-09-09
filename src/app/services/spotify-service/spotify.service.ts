import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  SPOTIFY_AUTH = '';

  constructor(private http: HttpClient) { }

  searchMusic(title): Observable<any> {
    const url = 'https://api.spotify.com/v1/search';
    const params = {q: title, type: 'track'}; 

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.SPOTIFY_AUTH}`);

    return this.http
      .get(url, { headers, observe: 'response', params });
  }
}
