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

  //Artists
  searchArtists(searchTerm: string): Observable<any> {
    const url = `${BASE_URL}/search?q=${searchTerm}&type=artist&market=PT&limit=5&offset=0`;
    return this.http.get<Artist[]>(url);
  }

  getRelatedArtists(artistId: string): Observable<any> {
    const url = `${BASE_URL}/artists/${artistId}/related-artists`;
    return this.http.get<Artist[]>(url);
  }

  getArtistTop10(artistId: string): Observable<any> {
    const url = `${BASE_URL}/artists/${artistId}/top-tracks?country=PT`;
    return this.http.get<Artist[]>(url);
  }

  //Profile
  getProfile(): Observable<any> {
    const url = BASE_URL + '/me';
    return this.http.get<Profile>(url);
  }


}
