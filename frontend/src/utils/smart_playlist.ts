import { addTracksToPlaylist, getPlaylistTracks, removeTracksFromPlaylist } from "./spotify_api_handler";

export async function syncSmartPlaylist(smartPlaylist: SmartPlaylist, keepUnmatchedTracks: boolean = true) {
    const parentTracks = new Set<Track>(await getPlaylistTracks(smartPlaylist.parent_playlist_id));
    const childrenTracks = new Set<Track>();
    for (const childPlaylistId of smartPlaylist.children) {
        const childTracks = await getPlaylistTracks(childPlaylistId);
        childTracks.map((track) => childrenTracks.add(track));
    }
    const tracksToAdd = [...childrenTracks].filter(track => !parentTracks.has(track));
    addTracksToPlaylist(smartPlaylist.parent_playlist_id, tracksToAdd);
    if (!keepUnmatchedTracks) {
        const tracksToRemove = [...parentTracks].filter(track => !childrenTracks.has(track));
        removeTracksFromPlaylist(smartPlaylist.parent_playlist_id, tracksToRemove);
    }
}
