import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as _ from "lodash";

const MAX_NUMBER_OF_ARTISTS = 5;
const MAX_NUMBER_OF_SONGS_PER_ARTIST = 5;

@Component({
  selector: 'app-customize-panel',
  templateUrl: './customize-panel.component.html',
  styleUrls: ['./customize-panel.component.scss']
})
export class CustomizePanelComponent implements OnInit {
  slideToggleButtonColor: string = "primary";
  artistsNumber: number = 1;
  songsNumber: number = 1;
  @Output() artistsNumberOut: EventEmitter<number> = new EventEmitter();
  @Output() songsNumberOut: EventEmitter<number> = new EventEmitter();
  numberOfArtistsArray: number[] = [];
  numberOfSongsPerArtistArray: number[] = [];

  constructor() { }

  ngOnInit() {
    this.numberOfArtistsArray = _.range(1, MAX_NUMBER_OF_ARTISTS + 1);
    this.numberOfSongsPerArtistArray = _.range(1, MAX_NUMBER_OF_SONGS_PER_ARTIST + 1);
  }

  onArtistsNumberChange() {
    this.artistsNumberOut.emit(this.artistsNumber);
  }

  onSongsNumberChange() {
    this.songsNumberOut.emit(this.songsNumber);
  }
}
