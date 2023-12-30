import streamlit as st
import requests
import os
from objects.SpotifyUser import SpotifyUser  # Ensure this import works in your environment

# Load environment variables
CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
REDIRECT_URI = 'http://localhost:8501/callback'  # Streamlit runs on 8501 by default

def fetch_spotify_token(code):
    auth_token_url = 'https://accounts.spotify.com/api/token'
    payload = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }
    response = requests.post(auth_token_url, data=payload)
    return response.json()

def fetch_user_library(access_token):
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get('https://api.spotify.com/v1/me/tracks', headers=headers)
    return response.json().get('items', [])

# Streamlit app starts here
if 'user' not in st.session_state:
    st.session_state.user = None

if st.session_state.user is None:
    # Display login button
    st.write('Please log in to Spotify')
    if st.button('Log in'):
        # Implement the logic to redirect to Spotify's auth page
        # Note: Direct redirect is not possible in Streamlit. You might need to display the link and let the user click it.
        pass
else:
    user = st.session_state.user
    # Fetch and display the library
    tracks = fetch_user_library(user.access_token)
    for track in tracks:
        st.write(f"{track['track']['name']} by {track['track']['artists'][0]['name']}")

# Placeholder for OAuth callback handling
# In Streamlit, handling this would typically require the user to copy the callback URL into the app manually
if st.experimental_get_query_params():
    code = st.experimental_get_query_params().get('code', '')
    if code:
        token_data = fetch_spotify_token(code)
        st.session_state.user = SpotifyUser(token_data['access_token'], token_data['refresh_token'])
