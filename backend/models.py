from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    owned_playlists = db.relationship('Playlist', backref='user', lazy=True,
                                      cascade="all, delete")


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
