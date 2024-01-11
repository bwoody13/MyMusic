import axios from 'axios';
import {refreshAccessToken} from './auth'

const spApiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor for handling token refresh
spApiClient.interceptors.response.use(response => response, async (error) => {
  if (error.response && error.response.status === 401) {
    await refreshAccessToken()
  }
  return Promise.reject(error);
});

function getAuthHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
};

async function apiGet(endpoint: string, options = {}) {
  return spApiClient.get(endpoint, { ...options, headers: getAuthHeader() });
}

async function apiPost(endpoint: string, data: any, options = {}) {
  return spApiClient.post(endpoint, data, { ...options, headers: getAuthHeader() });
}

async function apiDelete(endpoint: string, options = {}) {
    return spApiClient.delete(endpoint, { ...options, headers: getAuthHeader() });
}

async function getAllItems(endpoint: string, options = {}) {
  let items: any[] = [];
  let nextPageUrl = endpoint;
  do {
    const response = await apiGet(nextPageUrl, options);
    items = items.concat(response.data.items);
    nextPageUrl = response.data.next;
  } while (nextPageUrl);
  return items;
}

export async function getLikedAlbums(): Promise<Album[]> {
  const items = await getAllItems('me/albums?limit=50');
  return items.map((res: any) => res.album);
};


export async function getPlaylists(): Promise<Playlist[]> {
  const items = await getAllItems('me/playlists?limit=50');
  return items;
};

export async function getUserInfo(): Promise<User> {
  const response = await apiGet('me');
  return response.data;
}

export async function getPlaylistTracks(playlistId: string): Promise<Track[]> {
  const items = await getAllItems(`playlists/${playlistId}/tracks?fields=next,items(track(id))&limit=50`);
  return items.map((res: any) => res.track);
}

export async function addTracksToPlaylist(playlistId: string, trackIds: Track[]) {
    const trackUris = trackIds.map(track => `spotify:track:${track.id}`);
    const response = await apiPost(`playlists/${playlistId}/tracks`, { uris: trackUris });
    return response.data;
}

export async function removeTracksFromPlaylist(playlistId: string, trackIds: Track[]) {
    const trackUris = trackIds.map(track => `spotify:track:${track.id}`);
    const response = await apiDelete(`playlists/${playlistId}/tracks`, { tracks: trackUris });
    return response.data;
}

export async function createPlaylist(name: string, description: string, isPublic: boolean): Promise<Playlist> {
    const response = await apiPost('me/playlists', {
        name,
        description,
        public: isPublic
    });
    return response.data;
}
