import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from 'src/app/models/Artist';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  searchResults: Artist[];
  artistsList: Artist[];

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.searchResults = [];
    this.artistsList = [];

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
          /*Transform genres array into string*/
          var genresAsString = "";
          for (let genre of artist.genres) {
            if (genre != "") {
              genresAsString = genresAsString.length > 0 ? genresAsString.concat(", " + genre) : genresAsString.concat(genre);
            }
          }
          //Add artists to list
          this.searchResults.push({
            id: artist.id,
            name: artist.name.length > 17 ? artist.name.slice(0, 16) + "..." : artist.name,
            image_url: artist.images[2] ? artist.images[2].url : "assets/icons/151716-musician-human-pictograms/svg/singer-4.svg",
            genres: genresAsString.length > 25 ? genresAsString.slice(0, 24) + "..." : genresAsString,
            followers: artist.followers.total
          } as Artist);
        });
      });
    }
  }

  onSelect(artist: Artist) {
    this.searchTerm = "";
    this.searchResults = [];
    this.artistsList.unshift(artist);
  }

}
