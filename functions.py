import random


def random_album(albums):
    n = len(albums)
    album_idx = random.randint(0, n-1)
    return albums[album_idx]