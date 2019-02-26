import { Album } from './Album';
import { ArtistShort } from './ArtistShort';

export interface Track {
    id?: string,
    name?: string,
    duration?: number;
    artists?: ArtistShort[];
    album: Album;
}