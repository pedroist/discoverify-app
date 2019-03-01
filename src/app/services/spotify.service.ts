import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { Profile } from '../models/Profile';
import { Track } from '../models/Track';

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
  //Playlist
  createPlaylist(name: string, description: string, isPublic: boolean): Observable<any> {
    const url = BASE_URL + '/me/playlists';
    let body = {
      name: name,
      description: description,
      public: isPublic
    };

    return this.http.post(url, body, httpOptions);
  }

  updatePlaylist(name: string, description: string, isPublic: boolean, playlistId: string): Observable<any> {
    const url = BASE_URL + `/playlists/${playlistId}`;
    let body = {
      name: name,
      description: description,
      public: isPublic
    };

    return this.http.put(url, body, httpOptions);
  }
  getPlaylistDetails(playlistId: string): Observable<any> {
    const url = BASE_URL + `/playlists/${playlistId}`;

    return this.http.get(url);
  }

  getPlaylistTracks(playlistId: string): Observable<any> {
    const url = BASE_URL + `/playlists/${playlistId}/tracks`;

    return this.http.get(url);
  }

  addTracksToPlaylist(playlistId: string, uris: string[]) {
    const url = BASE_URL + `/playlists/${playlistId}/tracks`;
    let body = {
      uris: uris
    };

    return this.http.post(url, body, httpOptions);
  }

  getTracksUrisList(tracks: Track[]): string[] {
    let uris: string[] = [];
    for (let track of tracks) {
      if (track.uri) {
        uris.push(track.uri);
      }
    }
    return uris;
  }
}
