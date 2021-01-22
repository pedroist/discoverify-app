import { map, mergeMap, takeWhile, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from 'src/app/models/Artist';
import { Track } from '../../models/Track';
import { ModalService } from '../../services/modal.service';
import { MapperService } from '../../services/mapper';
import { from, iif, of } from 'rxjs';
import { concatAll, concatMap, take } from 'rxjs/operators';

declare var $: any;

const DEFAULT_RELATED_ARTISTS_NUMBER = 2;
const DEFAULT_NUMBER_OF_SONGS_PER_ARTIST = 1;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  searchResults: Artist[] = [];
  artistsList: Artist[] = [];
  relatedArtistsIds = new Set<string>();
  topTracksURIs: string[] = [];
  isCustom: Boolean = false;
  numberOfRelatedArtists: number = DEFAULT_RELATED_ARTISTS_NUMBER;
  numberOfSongsPerArtist: number = DEFAULT_NUMBER_OF_SONGS_PER_ARTIST;
  totalNumberOfTracks: number = DEFAULT_RELATED_ARTISTS_NUMBER * DEFAULT_NUMBER_OF_SONGS_PER_ARTIST; // default

  // topTracksSource = new BehaviorSubject<Track[]>([]);
  // topTracksAsObservable = this.topTracksSource.asObservable();

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

  /* Received Outputs ---------- */
  onArtistsOutputReceived(numberOfArtists: number) {
    this.numberOfRelatedArtists = numberOfArtists;
  }

  onSongsOutputReceived(numberOfSongs: number) {
    this.numberOfSongsPerArtist = numberOfSongs;
  }
  /* --------------------------- */

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
    this.artistsList.push(artist);
  }

  createPlaylist(content) {
    let selectedArtistsCounter = 0;

    //from: transforms array into observable of values
    from(this.artistsList)
      .pipe(
        //process sequentially to keep the order
        concatMap(artist => {
          selectedArtistsCounter++;
          
          //Spotify request of related artists
          return this.spotifyService.getRelatedArtists(artist.id)
            .pipe(
              map(obj => {
                // return only the array of artists from { artists: []}
                return obj.artists;
              }),

              //concatAll: turns the array into an observable of values
              concatAll(),

              //Takes every element until the condition returns false
              takeWhile((artist: Artist) => this.relatedArtistsIds.size < this.numberOfRelatedArtists * selectedArtistsCounter),

              //iif works inside mergeMap, returns of(artist) if condition true, or of(undefined) if false
              //-> This is a way of not emiting repeated artists
              mergeMap((artist: Artist) => iif(() => !this.relatedArtistsIds.has(artist.id), of(artist), of(undefined))),
              
              //tap: side-effects, doesn't change the observable
              tap((artist: Artist) => {
                //the condition artist != undefined is needed because of the iif() used above
                if(artist != undefined && !this.relatedArtistsIds.has(artist.id)){
                  this.relatedArtistsIds.add(artist.id)
                }
              }),
              concatMap((artist: Artist) => {

                return artist === undefined
                  ? of(undefined) 
                  : this.spotifyService.getArtistTop10(artist.id)
                    .pipe(
                      map(obj => {
                        // return only the array of tracks from { track: []}
                        return obj.tracks;
                      }),
                      concatAll(),
                      take(1)
                    )
              })
            )
        })
      ) 
      .subscribe((track: Track) => {
        debugger;
        if(track && track.uri){
          this.topTracksURIs.push(track.uri);
        }
      }, error => {
        console.log(error);
      }, () => {
        console.log("Complete!");
        debugger;
        if (this.topTracksURIs.length > 0) {
          this.modalService.openModal(content);//content is the template that came on input of createTemplate()
        } else {
          alert("No suggestions were found! " + this.topTracksURIs.length);
        }
      });
  }
}
