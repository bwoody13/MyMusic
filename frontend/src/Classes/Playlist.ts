import { Expose } from "class-transformer";

export default class Playlist {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    description: string;
    @Expose()
    images: {url: string}[];
    @Expose()
    type: string;
    @Expose()
    owner: {display_name: string, id: string};
    @Expose
    snapshot_id: string;
}