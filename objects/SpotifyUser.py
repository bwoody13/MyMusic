class SpotifyUser:
    def __init__(self, access_token, refresh_token):
        self.access_token = access_token
        self.refresh_token = refresh_token
        # TODO: Add other user specific details as needed