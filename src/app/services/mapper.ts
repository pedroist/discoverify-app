import { Injectable } from '@angular/core';
import { Artist } from '../models/Artist';
import { ArtistShort } from '../models/ArtistShort';
import { Track } from '../models/Track';
import { Album } from '../models/Album';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor(
    private utils: UtilsService
  ) { }

  jsonToArtist(artistJson: any): Artist {
    /*Transform genres array into string*/
    var genresAsString = "";
    for (let genre of artistJson.genres) {
      if (genre != "") {
        genresAsString = genresAsString.length > 0 ? genresAsString.concat(", " + genre) : genresAsString.concat(genre);
      }
    }

    return {
      id: artistJson.id,
      name: artistJson.name.length > 17 ? artistJson.name.slice(0, 16) + "..." : artistJson.name,
      image_url: artistJson.images[2] ? artistJson.images[2].url : "assets/icons/151716-musician-human-pictograms/svg/singer-4.svg",
      genres: genresAsString.length > 25 ? genresAsString.slice(0, 24) + "..." : genresAsString,
      followers: artistJson.followers.total
    } as Artist;
  }

  jsonToArtistShort(artistShortJson: any): ArtistShort {
    return {
      id: artistShortJson.id,
      name: artistShortJson.name
    } as ArtistShort;
  }

  jsonToAlbum(albumJson): Album {
    let date =
      albumJson.release_date_precision == "day" ?
        albumJson.release_date.substring(0, 4) :
        albumJson.release_date;

    return {
      id: albumJson.id,
      name: albumJson.name,
      total_tracks: albumJson.total_tracks,
      image_url: albumJson.images[2] ? albumJson.images[2].url : "assets/icons/151716-musician-human-pictograms/svg/dj.svg",
      release_year: date
    } as Album;
  }
  jsonToTrack(trackJson: any): Track {
    let artistsAux: ArtistShort[] = [];

    for (let artist of trackJson.artists) {
      artistsAux.push(this.jsonToArtistShort(artist));
    }

    let duration = this.utils.miliSecondsToTime(trackJson.duration_ms);

    return {
      id: trackJson.id,
      name: trackJson.name,
      duration: duration,
      artists: artistsAux,
      album: this.jsonToAlbum(trackJson.album),
      uri: trackJson.uri
    } as Track;
  }
}
