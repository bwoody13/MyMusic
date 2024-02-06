import { AlbumDisplay } from "../Classes/Album";
import { albumToAlbumDisplay, filterGenreSeeds } from "./helpers";
import { getAlbum, getAlbumTracks, getArtists, recommendTracks } from "./spotify_api_handler";
import { AVAILABLE_GENRE_SEEDS } from "./genre_seeds";

export async function recommendAlbum(baseAlbum: AlbumDisplay, excludeAlbums: string[] = []): Promise<AlbumDisplay> {
    // TODO: get tracks for album from API
    const tracks = await getAlbumTracks(baseAlbum.id).then(tracks => {
        tracks.sort((a, b) => b.popularity - a.popularity);
        return tracks;
    });

    // TODO: pick 5 most popular tracks
    const top5Tracks = tracks.slice(0, 5);

    // TODO: gather artist_ids and genres
    // const album = await getAlbum(baseAlbum.id);
    // const artistIds = album.artists.map(artist => artist.id);
    // const artists = await getArtists(artistIds);
    // const genres = artists.flatMap(artist => artist.genres);
    // const seedGenres = filterGenreSeeds(genres);

    // TODO: call recommendation API
    // NOTE: Only 5 seeds total across all seeds
    const recommendedTracks = await recommendTracks([], [], top5Tracks.flatMap(track => track.id))

    // TODO: group tracks by album
    const albumTrackCount = recommendedTracks.reduce((count: any, track) => {
        const albumId = track.album.id;
        if (!excludeAlbums.includes(albumId)) {
            count[albumId] = (count[albumId] || 0) + 1;
        } 
        return count;
    }, {});
    // console.log(albumTrackCount);

    // TODO: for each album starting from most tracks check if in library, if not done, if it is then skip
    let maxCount = 0;
    let maxCountAlbumId = "";
    for (const albumId in albumTrackCount) {
        // console.log(albumId)
        if (albumTrackCount[albumId] > maxCount) {
            maxCount = albumTrackCount[albumId];
            maxCountAlbumId = albumId;
        }
    }
    console.log(maxCount, maxCountAlbumId)

    // TODO: return the album
    const recommendAlbum = await getAlbum(maxCountAlbumId);
    return albumToAlbumDisplay(recommendAlbum);
}