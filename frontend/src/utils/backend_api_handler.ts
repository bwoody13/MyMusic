import axios, { AxiosRequestConfig } from 'axios';

const backendClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

async function backendGet(endpoint: string, options: AxiosRequestConfig = {}) {
  const response = await backendClient.get(endpoint, options);
  return response.data;
}

async function backendPost(endpoint: string, data: any, options: AxiosRequestConfig = {}) {
  const response = await backendClient.post(endpoint, data, options);
  return response.data;
}

// Specific API calls
export async function updateUser(userData: UserData): Promise<any> {
  return backendPost('/user', userData);
}

export async function updatePlaylists(playlistsData: Playlist[]): Promise<any> {
  return backendPost('/playlists', { playlists: playlistsData });
}

export async function addSmartPlaylist(smartPlaylistData: SmartPlaylistData): Promise<any> {
  return backendPost('/smart_playlists', smartPlaylistData);
}

export async function getSmartPlaylists(): Promise<SmartPlaylist[]> {
  return backendGet('/smart_playlists');
}

// Additional functions for other backend API endpoints can be added similarly
