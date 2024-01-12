import { Expose } from "class-transformer";
import Playlist from "./Playlist";

export default class SmartPlaylist {
    @Expose()
    parent_playlist: Playlist;
    @Expose()
    children: ChildPlaylist[];
}

export class ChildPlaylist {
    @Expose()
    playlist: Playlist;
    @Expose()
    last_sync_snapshot_id: string;
}

export class SmartPlaylistData {
    @Expose()
    parent_playlist_id: string;
    @Expose()
    children: string[];
    @Expose()
    owner_id: string;
}

export class SmartPlaylistSyncData {
    @Expose()
    parent_playlist_id: string;
    @Expose()
    children: {child_playlist_id: string, snapshot_id: string}[];
}