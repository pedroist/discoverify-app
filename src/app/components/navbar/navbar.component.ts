import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { SpotifyService } from '../../services/spotify.service';
import { Profile } from '../../models/Profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  profile: Profile = {
    id: '',
    name: '',
    img: '',
    followers: -1
  };

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.authService.isLoggedInReference.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      if (isLoggedIn) {
        this.spotifyService.getProfile().subscribe(profile => {
          this.profile.id = profile.id;
          this.profile.name = profile.display_name;
          this.profile.followers = profile.followers.total;
          this.profile.img =
            (profile.images.length > 0 && typeof profile.images[0].url !== "undefined") ?
              profile.images[0].url :
              '';
        });
      }
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  onLogout() {
    this.authService.logout();
    if (!this.authService.isLoggedIn()) {
      this.isLoggedIn = false;
    }
  }
}
