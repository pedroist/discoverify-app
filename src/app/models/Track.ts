import { Album } from './Album';
import { ArtistShort } from './ArtistShort';

export interface Track {
    id?: string,
    name?: string,
    duration?: string,
    artists?: ArtistShort[],
    album?: Album,
    uri?: string
}