import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SpotifyService } from '../../../services/spotify.service';
import { Artist } from '../../../models/Artist';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  //styleUrls: ['./login-modal.component.css'], // só se pode utilizar o style ou o styleUrls de cada vez
  encapsulation: ViewEncapsulation.None, //permite aplicar estilos a um componente já existente
  styles: [`
    .modal {
      top: 30%;
    }
    .modal-dialog {
      max-width: 375px;
    }
    .login-btn {
      font-size: 1.1rem;
      line-height: 1.4;
      border-radius: 1.25rem;
    }
    .login-btn:active, .login-btn:focus {
      box-shadow: none !important;
      cursor: pointer;
    }
  `]
})
export class LoginModalComponent implements OnInit {
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
}

