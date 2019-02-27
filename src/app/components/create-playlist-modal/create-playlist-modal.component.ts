import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../models/Track';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

const PRIVATE = "private";
const PUBLIC = "public";

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
  @Input() tracks: Track[];
  playlistName: string;
  playlistDescription: string;
  playlistPrivacy: string = PRIVATE;
  playlistId: string;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  createPlaylist() {
    this.spotifyService.createPlaylist(
      this.playlistName,
      this.playlistDescription,
      this.playlistPrivacy === PRIVATE ? false : true
    )
      .subscribe(result => {
        if (!result.id) {
          throw "Error creating playlist. No id received";
        }
        //addTracks to Playlist:
        //TODO: dividir em 2 caso sejam mais que 100 musicas
        this.playlistId = result.id;

        this.spotifyService.addTracksToPlaylist(
          result.id,
          this.spotifyService.getTracksUrisList(this.tracks)
        ).subscribe(result => {
          console.log("Tracks added to playlist " + this.playlistName + "successfully");
          this.modalService.closeModal();
          this.router.navigate([`/playlist/${this.playlistId}`]);
        })
      })
  }
}
