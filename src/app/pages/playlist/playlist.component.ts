import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { MapperService } from '../../services/mapper';
import { Track } from '../../models/Track';
import { ModalService } from '../../services/modal.service';
import { PlaylistDetails } from '../../models/PlaylistDetails';

const PRIVATE = "private";
const PUBLIC = "public";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistId: string;
  playlistName: string;
  playlistDescription: string;
  playlistPrivacy: string;

  tracks: Track[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private mapper: MapperService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    //get PlaylistId from URL
    this.playlistId = this.route.snapshot.params['id'];

    if (this.playlistId && this.playlistId.length > 0) {
      this.spotifyService.getPlaylistDetails(this.playlistId).subscribe(result => {
        this.playlistName = result.name;
        this.playlistDescription = result.description;
        this.playlistPrivacy = result.public ? PUBLIC : PRIVATE;
      })

      this.spotifyService.getPlaylistTracks(this.playlistId).subscribe(result => {

        for (let item of result.items) {
          this.tracks.push(this.mapper.jsonToTrack(item.track));
        }
      })
    }
  }

  editPlaylist(content) {
    this.modalService.openModal(content);
  }

  onPlaylistDetailsChange(details: PlaylistDetails) {
    this.playlistName = details.name;
    this.playlistDescription = details.description;
    this.playlistPrivacy = details.privacy;
  }
}
