import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/Artist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  artists: Artist[];

  constructor(
    private authService: AuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {

  }

  onLogin() {
    this.authService.login();
  }

  onSearch() {
    this.spotifyService.searchArtists().subscribe(artists => {
      this.artists = artists;
    });
  }
}

