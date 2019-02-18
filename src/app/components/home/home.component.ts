import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/Artist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artists: Artist[];

  constructor(
    private authService: AuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    const token = this.authService.extractToken();

    if (!this.authService.isLoggedIn()) {
      //TODO: Redirect to login page;
      console.log("Not logged in")
    } else {
      console.log("Logged in")
      //TODO: Redirect to Home page (without the access_token on URL);
    }
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  onSearch() {
    this.spotifyService.searchArtists().subscribe(artists => {
      this.artists = artists;
    });
  }
}
