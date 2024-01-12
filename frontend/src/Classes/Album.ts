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
