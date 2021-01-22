import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { Track } from '../../../models/Track';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { UtilsService } from '../../../services/utils.service';

const PRIVATE = "private";

@Component({
  selector: 'app-create-playlist-modal',
  templateUrl: './create-playlist-modal.component.html',
  //styleUrls: ['./create-playlist-modal.component.css']
  encapsulation: ViewEncapsulation.None, //Allows to apply styles to an existent component
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
    private modalService: ModalService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  createPlaylist() {
    //Create empty playlist
    this.spotifyService.createPlaylist(
      this.playlistName,
      this.playlistDescription,
      this.playlistPrivacy === PRIVATE ? false : true
    )
      .subscribe(result => {
        if (!result.id) {
          throw "Error creating playlist. No id received";
        }

        this.playlistId = result.id;

        //since the service addTracksToPlaylist only allow a max of 100 tracks each time, 
        //lets use a loop to add groups of tracks in case they're more than 100
        let arrayOfTrackArrays = this.utilsService.splitArrayMaxLenght(Array.from(this.tracks), 100);

        //addTracks to Playlist in a loop:
        for (let tracksGroup of arrayOfTrackArrays) {
          this.spotifyService.addTracksToPlaylist(
            result.id,
            tracksGroup
          )
            .subscribe(result => {
              console.log("Tracks added to playlist " + this.playlistName + " successfully");
              this.modalService.closeModal();
              this.router.navigate([`/playlist/${this.playlistId}`]);
            })
        }
      })
  }
}
