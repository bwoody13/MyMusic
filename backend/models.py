from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    album_sync_date = db.Column(db.DateTime, nullable=True)
    playlist_sync_date = db.Column(db.DateTime, nullable=True)
    owned_playlists = db.relationship('Playlist', backref='user', lazy=True,
                                      cascade="all, delete")
    followed_playlists = db.relationship('PlaylistFollower', backref='user', lazy=True,
                                         cascade="all, delete")
    liked_albums = db.relationship('Album', backref='user', lazy=True,
                                   cascade="all, delete")


class Album(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)


class AlbumFollower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    album_id = db.Column(db.String(), db.ForeignKey('album.id'), nullable=False)


class Playlist(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    owner_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    child_playlists = db.relationship('SmartPlaylist',
                                      foreign_keys="SmartPlaylist.parent_playlist_id",
                                      backref='playlist', lazy=True,
                                      cascade="all, delete")
    followers = db.relationship('PlaylistFollower', backref='playlist', lazy=True,
                                cascade="all, delete")


class PlaylistFollower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.String(), db.ForeignKey('playlist.id'), nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)


class SmartPlaylist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_playlist_id = db.Column(db.String(), db.ForeignKey('playlist.id'), nullable=False)
    child_playlist_id = db.Column(db.String(), db.ForeignKey('playlist.id'), nullable=False)
