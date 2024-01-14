import Playlist, { PlaylistDisplay } from "../Classes/Playlist";

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    let index = 0;

    while (index < array.length) {
        chunks.push(array.slice(index, index + chunkSize));
        index += chunkSize;
    }

    return chunks;
}

export function playlistToPlaylistDisplay(playlist: Playlist): PlaylistDisplay {
    return {
        id: playlist.id,
        name: playlist.name,
        desc: playlist.description,
        img_url: playlist.images.length > 0 ? playlist.images[0].url : "",
        type: playlist.type,
        owner_id: playlist.owner.id,
        owner_name: playlist.owner.display_name,
        snapshot_id: playlist.snapshot_id
    }
}