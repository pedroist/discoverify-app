import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../../models/Artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  @Input() newArtist: Artist;

  constructor() { }

  ngOnInit() {
  }

}
