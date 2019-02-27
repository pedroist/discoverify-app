import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-create-playlist-modal',
  templateUrl: './create-playlist-modal.component.html',
  //styleUrls: ['./create-playlist-modal.component.css']
  encapsulation: ViewEncapsulation.None, //permite aplicar estilos a um componente já existente
  styles: [`
    .modal {
      top: 15%;
      left: 13.5%;
      right: 13.5%;
    }
    .modal-dialog {
      max-width: 450px;
    }
    .create-playlist-btn {
      font-size: 1.1rem;
      line-height: 1.4;
      border-radius: 1.25rem;
    }
    .create-playlist-btn:active, .login-btn:focus {
      box-shadow: none !important;
    }
    @media all and (max-width: 470px) {
      .modal {
        left: 0;
        right: 0;
      } 
    }
  `]
})
export class CreatePlaylistModalComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
  }

  createPlaylist() {
    this.spotifyService.createPlaylist("teste1", "description 1", false)
      .subscribe(result => {
        console.log(result);
      });
  }
}
