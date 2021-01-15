import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { SpotifyService } from '../../../services/spotify.service';
import { PlaylistDetails } from '../../../models/PlaylistDetails';

const PRIVATE = "private";
const PUBLIC = "public";


@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  //styleUrls: ['./edit-playlist-modal.component.scss']
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
export class EditPlaylistModalComponent implements OnInit {
  @Input() playlistName: string;
  @Input() playlistDescription: string;
  @Input() playlistPrivacy: string;
  @Input() playlistId: string;

  @Output() playlistDetails: EventEmitter<PlaylistDetails> = new EventEmitter<PlaylistDetails>();

  constructor(
    private modalService: ModalService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
  }

  editPlaylist() {
    this.playlistDescription;

    this.spotifyService.updatePlaylist(
      this.playlistName,
      this.playlistDescription,
      this.playlistPrivacy === PRIVATE ? false : true,
      this.playlistId
    ).subscribe(result => {
      console.log(result);
    });

    this.playlistDetails.emit({
      name: this.playlistName,
      description: this.playlistDescription,
      privacy: this.playlistPrivacy
    });

    this.modalService.closeModal();
  }
}
