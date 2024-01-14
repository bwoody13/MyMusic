from datetime import datetime
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models import db, User, Playlist, SmartPlaylist, PlaylistFollower, Album, AlbumFollower


load_dotenv()  # Load environment variables from .env file

APP_SECRET = os.getenv('APP_SECRET')

# Init app
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = APP_SECRET
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myspotify.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_ECHO'] = True


db.init_app(app)

with app.app_context():
    db.create_all()
    # db.drop_all()


# ROUTES
@app.route("/")
def index():
    return "MySpotify backend API is running!"


@app.route("/user", methods=["POST"])
def update_user():
    data = request.json
    id = data.get("id")

    if not id:
        return jsonify({"error": "User ID is required"}), 400

    access_token = data.get("access_token")

    user = User.query.filter_by(id=id).first()
    name = data.get("name")
    if name:
        if not user:
            user = User(id=id, name=name)
            db.session.add(user)
        elif name != user.name:
            user.name = name

    db.session.commit()
    session['user_id'] = user.id
    session['access_token'] = access_token
    return jsonify({"message": "User updated successfully"}), 200


@app.route("/user", methods=["GET"])
def get_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    user = User.query.filter_by(id=user_id).first_or_404()
    return jsonify(user.to_dict()), 200


@app.route("/albums", methods=["POST"])
def update_albums():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    data = request.json
    for album in data.get("albums", []):
        id = album.get("id")
        name = album.get("name")
        artistsData = album.get("artists")
        if not artistsData:
            return jsonify({"error": "Artists data is required"}), 400
        artists = ", ".join([artist.get("name") for artist in artistsData])
        if not id or not name or not artists:
            return jsonify({"error": "Invalid album data"}), 400

        genres = ", ".join(album.get("genres", ""))
        images = album.get("images", [{}])
        img_url = images[0].get("url", "") if images else ""

        album = Album.query.filter_by(id=id).first()
        if not album:
            album = Album(id=id, name=name, artists=artists, genres=genres, img_url=img_url)
            db.session.add(album)
        elif (name != album.name or artists != album.artists or genres != album.genres or
              img_url != album.img_url):
            album.name = name
            album.artists = artists
            album.genres = genres
            album.img_url = img_url

        album_follower = AlbumFollower.query.filter_by(user_id=user_id, album_id=id).first()
        if not album_follower:
            album_follower = AlbumFollower(user_id=user_id, album_id=id)
            db.session.add(album_follower)

    user = User.query.filter_by(id=user_id).first_or_404()
    user.album_sync_date = datetime.utcnow()

    db.session.commit()
    return jsonify({"message": "Albums synced successfully"}), 200


@app.route("/albums", methods=["GET"])
def get_albums():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    albums = User.query.filter_by(id=user_id).first_or_404().liked_albums
    return jsonify([Album.query.filter_by(id=album.album_id).first_or_404().to_dict()
                    for album in albums]), 200


@app.route("/playlists", methods=["POST"])
def update_playlists():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    data = request.json
    for playlist_data in data.get('playlists', []):
        playlist_id = playlist_data.get("id")
        name = playlist_data.get("name")
        owner_data = playlist_data.get("owner")
        owner_id = owner_data.get("id")
        snapshot_id = playlist_data.get("snapshot_id")
        if not playlist_id or not name or not owner_data or not owner_id or not snapshot_id:
            return jsonify({"error": "Playlist data is incomplete"}), 400

        owner_name = owner_data.get("name", "")
        desc = playlist_data.get("description", "")
        images = playlist_data.get("images", [{}])
        img_url = images[0].get("url", "") if images else ""

        playlist = Playlist.query.filter_by(id=playlist_id, owner_id=owner_id).first()
        if not playlist:
            owner = User.query.filter_by(id=owner_id).first()
            if not owner:
                owner = User(id=owner_id, name=owner_name)
                db.session.add(owner)
            playlist = Playlist(id=playlist_id, name=name, owner_id=owner_id,
                                snapshot_id=snapshot_id, desc=desc, img_url=img_url)
            db.session.add(playlist)
        elif snapshot_id != playlist.snapshot_id:
            playlist.name = name
            playlist.owner_id = owner_id
            playlist.snapshot_id = snapshot_id
            playlist.desc = desc
            playlist.img_url = img_url

        playlist_follower = PlaylistFollower.query.filter_by(playlist_id=playlist_id,
                                                             user_id=user_id).first()
        if not playlist_follower:
            playlist_follower = PlaylistFollower(playlist_id=playlist_id, user_id=user_id)
            db.session.add(playlist_follower)

    user = User.query.filter_by(id=user_id).first()
    user.playlist_sync_date = datetime.utcnow()

    db.session.commit()
    return jsonify({"message": "Playlists updated successfully"}), 200


@app.route("/playlists", methods=["GET"])
def get_playlists():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401
    
    user = db.get_or_404(User, user_id)

    playlistDicts = [Playlist.query.filter_by(id=playlist.playlist_id).first_or_404().to_dict()
                     for playlist in user.followed_playlists]
    for playlist in playlistDicts:
        playlist["owner_name"] = db.get_or_404(User, playlist['owner_id']).name
    return jsonify(playlistDicts), 200


@app.route("/smart_playlists", methods=["POST"])
def add_smart_playlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    data = request.json
    parent_playlist_id = data.get("parent_playlist_id")
    children = data.get("children")
    if not parent_playlist_id or not children:
        return jsonify({"error": "Parent playlist ID and children are required"}), 400

    playlist = Playlist.query.filter_by(id=parent_playlist_id).first()
    if playlist is None:
        return jsonify({"error": "Parent playlist not found"}), 404

    owner_id = playlist.owner_id
    if owner_id != user_id:
        return jsonify({"error": "User ID does not match playlist owner ID"}), 403

    for child_playlist_id in children:
        if child_playlist_id == parent_playlist_id:
            db.session.rollback()
            return jsonify({"error": "Child playlist cannot be the same as the parent"}), 400

        child_playlist = Playlist.query.filter_by(id=child_playlist_id).first()
        if child_playlist is None:
            db.session.rollback()
            return jsonify({"error": "Child playlist not found"}), 404
        smart_playlist = SmartPlaylist.query.filter_by(parent_playlist_id=parent_playlist_id,
                                                       child_playlist_id=child_playlist_id).first()
        if not smart_playlist:
            smart_playlist = SmartPlaylist(parent_playlist_id=parent_playlist_id,
                                           child_playlist_id=child_playlist_id)
            db.session.add(smart_playlist)

    db.session.commit()

    return jsonify({"message": "Smart playlist relationship added/updated successfully"}), 200


@app.route("/smart_playlists", methods=["GET"])
def get_smart_playlists():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    owned_playlists = User.query.get_or_404(user_id).owned_playlists
    smart_playlist_data = [
        {
            "parent_playlist": op.to_dict(),
            "children": [
                {
                    "playlist": Playlist.query.filter_by(
                        id=cp.child_playlist_id).first_or_404().to_dict(),
                    "last_sync_snapshot_id": SmartPlaylist.query.filter_by(
                        parent_playlist_id=op.id,
                        child_playlist_id=cp.child_playlist_id).first().last_sync_snapshot_id
                } for cp in op.child_playlists
            ]
        } for op in owned_playlists
        if op.child_playlists]

    return jsonify(smart_playlist_data), 200


@app.route("/smart_playlists/sync", methods=["POST"])
def sync_smart_playlists():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    playlist_data = request.get_json()
    if not playlist_data:
        return jsonify({"error": "No playlist data provided"}), 400

    parent_playlist_id = playlist_data.get("parent_playlist_id")
    if not parent_playlist_id:
        return jsonify({"error": "Parent playlist ID not provided"}), 400
    children = playlist_data.get("children", [])
    for child_playlist in children:
        child_playlist_id = child_playlist.get("child_playlist_id")
        snapshot_id = child_playlist.get("snapshot_id")
        if not child_playlist_id or not snapshot_id:
            return jsonify({"error": "Invalid child playlist data"}), 400

        smart_playlist = SmartPlaylist.query.\
            filter_by(parent_playlist_id=parent_playlist_id,
                      child_playlist_id=child_playlist_id).first_or_404()
        smart_playlist.last_sync_snapshot_id = snapshot_id

    db.session.commit()
    return jsonify({"message": "Smart playlist snapshots updated successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True)
