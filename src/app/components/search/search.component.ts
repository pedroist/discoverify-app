import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from 'src/app/models/Artist';
import { Track } from '../../models/Track';
import { ModalService } from '../../services/modal.service';
import { MapperService } from '../../services/mapper';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  searchResults: Artist[] = [];
  artistsList: Artist[] = [];
  relatedArtists: Artist[] = [];
  topTracks: Track[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private modalService: ModalService,
    private mapper: MapperService
  ) { }

  ngOnInit() {
    //Hide/show suggestions when clicked outside or inside searchbar
    $(document).mouseup(function (e) {
      var container = $("#artistsList");
      var container2 = $("#searchInput");
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target)
        && !container2.is(e.target)
        && container.has(e.target).length === 0
        && container2.has(e.target).length === 0) {
        container.hide();
      } else {
        container.show();
      }
    });
  }

  onInputChange() {
    if (this.searchTerm != "") {
      this.spotifyService.searchArtists(this.searchTerm).subscribe(result => {
        this.searchResults = [];
        result.artists.items.forEach(artist => {

          //Add artists to search results list (results in search bar)
          this.searchResults.push(this.mapper.jsonToArtist(artist));
        });
      });
    }
  }

  onSelect(artist: Artist) {
    this.searchTerm = "";
    this.searchResults = [];
    this.artistsList.unshift(artist);
  }

  createPlaylist(content) {
    //search related artists
    for (let artist of this.artistsList) {
      if (artist.id != null && typeof artist.id != "undefined") {
        //Spotify request
        this.spotifyService.getRelatedArtists(artist.id).subscribe(result => {

          for (let i = 0; i < 3; i++) {
            //Save related artist
            this.relatedArtists.push(this.mapper.jsonToArtist(result.artists[i]));

            //get related artist's top 10 songs
            this.spotifyService.getArtistTop10(result.artists[i].id).subscribe(result => {
              //save top tracks
              for (let track of result.tracks) {
                this.topTracks.push(this.mapper.jsonToTrack(track));
              }
            })
          }
        });
      }
    }

    //open create-playlist-modal and pass the songs
    this.modalService.openModal(content);
  }

  getRelated() {
    console.log(this.topTracks);
  }
}
