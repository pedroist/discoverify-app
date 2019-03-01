import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../models/Track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input() track: Track;
  artists: string = "";

  constructor() { }

  ngOnInit() {
    this.track.artists.forEach((artist, index) => {
      if (index == 0) {
        this.artists = this.artists.concat(artist.name);
      } else {
        this.artists = this.artists.concat(", " + artist.name);
      }
    })
    this.artists = this.artists.length > 45 ? this.artists.slice(0, 44) + "..." : this.artists;
    this.track.name = this.track.name.length > 40 ? this.track.name.slice(0, 39) + "..." : this.track.name;
  }

}
