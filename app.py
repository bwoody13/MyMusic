import random
from flask import Flask, request, redirect, session, render_template
import requests
from dotenv import load_dotenv
import os
import functions

from objects.SpotifyUser import SpotifyUser

load_dotenv()  # Load environment variables from .env file

CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
APP_SECRET = os.getenv('APP_SECRET')
REDIRECT_URI = 'http://localhost:5000/callback'
SPOTIFY_SCOPE = "user-library-read"

app = Flask(__name__)
app.secret_key = APP_SECRET  # Set a strong secret key


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/login')
def login():
    auth_url = ("https://accounts.spotify.com/authorize" +
                "?response_type=code" +
                "&client_id=" + CLIENT_ID +
                "&scope=user-read-private user-read-email user-library-read" +
                "&redirect_uri=" + REDIRECT_URI)
    return redirect(auth_url)


@app.route('/callback')
def callback():
    code = request.args.get('code')
    auth_token_url = 'https://accounts.spotify.com/api/token'
    payload = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }
    response = requests.post(auth_token_url, data=payload).json()

    # Create user with tokens
    access_token = response['access_token']
    refresh_token = response['refresh_token']
    user = SpotifyUser(access_token, refresh_token)
    session['user'] = user.__dict__  # Store user object in session

    # return f'Logged in as user with Access Token: {access_token}<br>Refresh Token: {refresh_token}'
    return redirect('/dashboard')
    # Here you can use the access_token to make authorized API requests


@app.route("/dashboard")
def dashboard():
    if 'user' not in session:
        return redirect('/index')

    user = SpotifyUser(**session['user'])
    access_token = user.access_token
    headers = {'Authorization': f'Bearer {access_token}'}
    albums_response = requests.get("https://api.spotify.com/v1/me/albums?limit=50", headers=headers).json()

    albums = albums_response.get('items', [])
    while albums_response['next']:
        albums_response = requests.get(albums_response['next'], headers=headers).json()
        albums.extend(albums_response.get('items', []))
    # print(albums_response)
    rand_album = functions.random_album(albums)
    # print(rand_album.album.name)
    return render_template("dashboard.html", albums=albums, rand_album=rand_album)

@app.route('/library')
def library():
    if 'user' in session:
        user = SpotifyUser(**session['user'])
        headers = {'Authorization': f'Bearer {user.access_token}'}
        response = requests.get('https://api.spotify.com/v1/me/tracks', headers=headers)
        tracks = response.json().get('items', [])
        return render_template('library.html', tracks=tracks)
    else:
        return redirect('/')


if __name__ == '__main__':
    app.run(debug=False)
