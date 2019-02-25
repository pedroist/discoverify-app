import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { Profile } from '../models/Profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const BASE_URL = "https://api.spotify.com/v1";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  searchArtists(searchTerm: string): Observable<any> {
    const url = `${BASE_URL}/search?q=${searchTerm}&type=artist&market=PT&limit=5&offset=0`;
    return this.http.get<Artist[]>(url);
  }

  getProfile(): Observable<any> {
    const url = BASE_URL + '/me';
    return this.http.get<Profile>(url);
  }
}
