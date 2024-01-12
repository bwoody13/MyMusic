import { Expose } from "class-transformer";

export default class Album {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    images: {url: string}[];
    @Expose()
    type: string;
    @Expose()
    artists: { id: string; name: string; }[];
    @Expose()
    genres: string[];
};

export class AlbumDisplay {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    img_url: string;
    @Expose()
    type: string;
    @Expose()
    artists: string; // Comma separated string of artist names
    @Expose()
    genres: string; // Comma separated string of genre names
}
