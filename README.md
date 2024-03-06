# MyMusic (previously MySpotify)
A full-stack Spotify application that adds additional functionality on top of that available through the Spotify app. Soon to be deployed...

## Design Outline
There is a front-end that uses React and ReactRouter to build and organize the page structure and site map. Communications to the Python back-end are made using Axios and received using Flask. The back-end utilizes SQLAlchemy and SQLite to manage a database for user information and listening information. 

## Functionality
There are two main dashboards:
### Album Dashboard
- Loads user's liked albums and when will create a background display which is a composition of all the user's liked albums
- Allows the user to get a randomly selected liked album, meant to allow users to simulate full album listening as you would with a vinyl record
- Based on a user's liked albums recommend another to the user, done using Spitfy recommendations API
### Playlist Dashboard
- Allows users to create a Smart Playlist, which is a tree-like hierarchy for playlists including a parent and a child, where parents are a combination of all songs in the child playlists
- Display all user smart playlists created, allowing users to then sync the playlists updating the parent to have all child playlist songs
- Recommend a track list to a user based on an existing playlist
- Recommend additional songs to the user that could complement a specific playlist
