import { Expose } from "class-transformer";

export default class Track {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    popularity: number;
    @Expose()
    album: {id: string, name: string}
}