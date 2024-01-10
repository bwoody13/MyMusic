class Album:
    def __init__(self, raw_json):
        self.id = raw_json['id']
        self.artists = raw_json['artists']
        self.name = raw_json['name']
        self.genres = raw_json['genres']
        self.image = raw_json['images'][0]['url']
        self.tracks = raw_json['tracks']

    def __str__(self):
        artists = ""
        for artist in self.artists:
            artists += artist['name'] + ", "
        artists = artists.rstrip(", ")
        return f"{self.name} by {artists}"
