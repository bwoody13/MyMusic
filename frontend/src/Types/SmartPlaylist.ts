interface SmartPlaylist {
    parent_playlist_id: string;
    children: string[];
}

interface SmartPlaylistData extends SmartPlaylist {
    owner_id: string;
}

interface SmartPlaylistSyncData {
    parent_playlist_id: string;
    children: {child_playlist_id: string, snapshot_id: string}[];
}