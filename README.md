# MySpotify
A full-stack Spotify application which adds additional fuctionality on top of that avaialble throught the Spotify app. Soon to be deployed...

## Design Outline
There is a front-end that uses React and ReactRouter to build and organize the page structure and site map. Communications to the Python back-end are made using Axios and received using Flask. The back-end utilizes SQLAlchemy and SQLite to manage a database for user information and listening information. 

## Functionality
There are two main dashboards:
### Album Dashboard
- Loads user's liked albums and when will create a background display which is a composition of all the user's liked albums
- Allows the user to get a randomly selected liked album, meant to allow users to simulate full album listening as you would with a vinyl record
- *To be added* Based on the user's liked albums recommend other albums to the user, done using Spitfy recommendations API
### Playlist Dashboard
- Allows users to create a Smart Playlist, which is a tree-like hierarchy for playlists including a parent and a child, where parents are a combination of all songs in the child playlists
- Display all user smart playlists created, allowing users to then sync the playlists updating the parent to have all child playlist songs
- *To Be Added* Recommend a playlist to a user based on some playlists
- *To Be Added* Recommend additional songs to the user which could complement a specific playlist, then be able to add the songs
