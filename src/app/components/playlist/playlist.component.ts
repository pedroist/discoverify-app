import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { MapperService } from '../../services/mapper';
import { Track } from '../../models/Track';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistId: string;
  tracks: Track[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private mapper: MapperService
  ) { }

  ngOnInit() {
    this.playlistId = this.route.snapshot.params['id'];
    if (this.playlistId && this.playlistId.length > 0) {
      this.spotifyService.getPlaylistTracks(this.playlistId).subscribe(result => {

        for (let item of result.items) {
          this.tracks.push(this.mapper.jsonToTrack(item.track));
        }
      })
    }
  }

}
