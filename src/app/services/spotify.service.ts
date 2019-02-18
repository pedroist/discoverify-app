import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const BASE_URL = "https://api.spotify.com/v1";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  searchArtists(): Observable<any> {
    const url = BASE_URL + '/search?q=slash&type=artist&market=PT&offset=0';
    return this.http.get<Artist[]>(url);
  }
}
