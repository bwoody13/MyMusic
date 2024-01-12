from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import ColumnProperty


db = SQLAlchemy()


class Base(db.Model):
    __abstract__ = True

    def to_dict(self):
        data = {}
        for c in inspect(self).mapper.column_attrs:
            if isinstance(c, ColumnProperty):
                data[c.key] = getattr(self, c.key)
        return data
            # print(c.key, getattr(self, c.key))
        # return {c.name: getattr(self, c.name) for c in inspect(self).mapper.column_attrs}


class User(Base):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=True)
    album_sync_date = db.Column(db.DateTime, nullable=True)
    playlist_sync_date = db.Column(db.DateTime, nullable=True)
    owned_playlists = db.relationship('Playlist', backref='user', lazy=True,
                                      cascade="all, delete")
    followed_playlists = db.relationship('PlaylistFollower', backref='user', lazy=True,
                                         cascade="all, delete")
    liked_albums = db.relationship('AlbumFollower', backref='user', lazy=True,
                                   cascade="all, delete")


class Album(Base):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    artists = db.Column(db.String(), unique=False, nullable=False)
    genres = db.Column(db.String(), unique=False, nullable=True)
    img_url = db.Column(db.String(), unique=False, nullable=True)


class AlbumFollower(Base):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    album_id = db.Column(db.String(), db.ForeignKey('album.id'), nullable=False)


class Playlist(Base):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    owner_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    snapshot_id = db.Column(db.String(), unique=False, nullable=False)
    desc = db.Column(db.String(), unique=False, nullable=True)
    img_url = db.Column(db.String(), unique=False, nullable=True)
    child_playlists = db.relationship('SmartPlaylist',
                                      foreign_keys="SmartPlaylist.parent_playlist_id",
                                      backref='playlist', lazy=True,
                                      cascade="all, delete")
    followers = db.relationship('PlaylistFollower', backref='playlist', lazy=True,
                                cascade="all, delete")


class PlaylistFollower(Base):
    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.String(), db.ForeignKey('playlist.id'), nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)


class SmartPlaylist(Base):
    id = db.Column(db.Integer, primary_key=True)
    parent_playlist_id = db.Column(db.String(), db.ForeignKey('playlist.id'), nullable=False)
    child_playlist_id = db.Column(db.String(), db.ForeignKey('playlist.id'), nullable=False)
    last_sync_snapshot_id = db.Column(db.String(), unique=False, nullable=True)
