import requests


class SpotifyUser:
    def __init__(self, id, access_token):
        self.id = id
        self.access_token = access_token
        # TODO: Add other user specific details as needed

    def make_header(self):
        return {"Authorization": "Bearer {}".format(self.access_token)}

    def get_liked_albums(self):
        url = "https://api.spotify.com/v1/me/albums?limit=50"
        response = requests.get(url, headers=self.make_header()).json()
        albums = response.get("items", [])

        while response['next']:
            url = response['next']
            response = requests.get(url, headers=self.make_header()).json()
            albums.extend(response.get("items", []))
        return albums

    def get_user_playlists(self):
        url = "https://api.spotify.com/v1/me/playlists?limit=50"
        response = requests.get(url, headers=self.make_header()).json()
        playlists = response.get("items", [])
        while response['next']:
            url = response['next']
            response = requests.get(url, headers=self.make_header()).json()
            playlists.extend(response.get("items", []))
        return playlists
