import { Expose } from "class-transformer";

export default class Track {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    popularity: number;
    
}

export class TrackRecommednations extends Track {
    @Expose()
    album: {id: string, name: string}
}