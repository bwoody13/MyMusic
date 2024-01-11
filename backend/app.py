from flask import Flask, jsonify, request, session
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models import db, User, Playlist, SmartPlaylist, PlaylistFollower
from sqlalchemy import select


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

    if not access_token:
        return jsonify({"error": "Access token is required to authenticate user"}), 401

    user = User.query.filter_by(id=id).first()
    if not user:
        user = User(id=id, name=data.get("name", ""))
        db.session.add(user)
    else:
        user.name = data.get("name", "")

    db.session.commit()
    print("commit to DB")
    session['user_id'] = user.id
    session['access_token'] = access_token
    return jsonify({"message": "User updated successfully"}), 200


@app.route("/playlists", methods=["POST"])
def update_playlists():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    access_token = session.get('access_token')
    if not access_token:
        return jsonify({"error": "Access token not yet in session"}), 401

    data = request.json
    for playlist_data in data.get('playlists', []):
        playlist_id = playlist_data.get("id")
        name = playlist_data.get("name")
        owner_data = playlist_data.get("owner")
        owner_id = owner_data.get("id")
        playlist = Playlist.query.filter_by(id=playlist_id, owner_id=owner_id).first()
        if not playlist:
            owner = User.query.filter_by(id=owner_id).first()
            if not owner:
                owner_name = owner_data.get("name")
                owner = User(id=owner_id, name=owner_name)
                db.session.add(owner)
            playlist = Playlist(id=playlist_id, name=name, owner_id=owner_id)
            db.session.add(playlist)
        else:
            playlist.name = name
            playlist.owner_id = owner_id

        playlist_follower = PlaylistFollower.query.filter_by(playlist_id=playlist_id,
                                                             user_id=user_id).first()
        if not playlist_follower:
            playlist_follower = PlaylistFollower(playlist_id=playlist_id, user_id=user_id)
            db.session.add(playlist_follower)

    db.session.commit()
    return jsonify({"message": "Playlists updated successfully"}), 200


@app.route("/smart_playlists", methods=["POST"])
def add_smart_playlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    access_token = session.get('access_token')
    if not access_token:
        return jsonify({"error": "Access token not yet in session"}), 401

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

        smart_playlist = SmartPlaylist(parent_playlist_id=parent_playlist_id,
                                       child_playlist_id=child_playlist_id)
        db.session.add(smart_playlist)

    db.session.commit()

    return jsonify({"message": "Smart playlist relationship added successfully"}), 200


@app.route("/smart_playlists", methods=["GET"])
def get_smart_playlists():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not yet in session"}), 401

    access_token = session.get('access_token')
    if not access_token:
        return jsonify({"error": "Access token not yet in session"}), 401

    stmt = select(Playlist)\
        .where(Playlist.owner_id == user_id)

    owned_playlists = db.session.execute(stmt).scalars().all()
    smart_playlist_data = [{
        "parent_playlist_id": op.id,
        "children": [cp.child_playlist_id for cp in op.child_playlists]
    } for op in owned_playlists
        if op.child_playlists]

    return jsonify(smart_playlist_data), 200


if __name__ == '__main__':
    app.run(debug=True)
