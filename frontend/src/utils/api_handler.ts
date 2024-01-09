import {refreshAccessToken} from '../utils/auth'

const BASE_URL = 'https://api.spotify.com/v1';

function getAuthHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
};

async function callApi(endpoint: string, method: string = 'GET', options: any = {}, includesBaseUrl: boolean = false) {
    try {
        const url = includesBaseUrl ? endpoint : `${BASE_URL}/${endpoint}`;
        const response = await fetch(url, {
            headers: getAuthHeader(),
            method: method,
            ...options,
        });
        if (!response.ok) {
            // If the token is expired, refresh it and retry the request
            if (response.status === 401) {
              await refreshAccessToken();
              return callApi(endpoint, method, options);
            }
            throw new Error(`API call failed: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
      console.error('Error in API call:', error);
      throw error;
    }
}

async function getAllItems(endpoint: string, options: any = {}) {
  let items: any[] = [];
  let nextPageUrl = `${BASE_URL}/${endpoint}`;
  do {
    const response = await callApi(nextPageUrl, 'GET', options, true);
    items = items.concat(response.items);
    nextPageUrl = response.next;
  } while (nextPageUrl);
  return items;
}

export async function getLikedAlbums(): Promise<Album[]> {
  const items = await getAllItems('me/albums?limit=50');
  return items.map((res: any) => res.album);
};

// TODO: add more API calls
