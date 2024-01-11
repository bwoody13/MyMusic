import {useEffect, useState} from 'react'
import { getLikedAlbums } from '../utils/spotify_api_handler';

function AlbumDashboard() {
    const [randomAlbum, setRandomAlbum] = useState<Album | null>(null);

    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            // Fetch albums and playlists in parallel
            const albumsData = await getLikedAlbums();
            setAlbums(albumsData);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, []);


    async function handleRandomize() {
        try {
            const albumsData = albums;
            if (albumsData && albumsData.length > 0) {
                const randomIndex = Math.floor(Math.random() * albumsData.length);
                setRandomAlbum(albumsData[randomIndex]);
                console.log(albumsData[randomIndex])
            } else {
                console.log('No liked albums found');
            }
        } catch (error) {
            console.error('Error fetching albums:', error);
            // Handle the error appropriately
        }
    };

    return (
        <div>
            <h2>Album Dashboard</h2>
            {loading? <p>Loading Albums...</p> : <button onClick={handleRandomize}>Randomize Album</button>}
            {randomAlbum && (
                <div>
                    <h3>{randomAlbum.name}</h3>
                    <p>{randomAlbum.artists.map(artist => artist.name).join(', ')}</p>
                    <img src={randomAlbum.images[0].url} alt={randomAlbum.name} width="200" />
                </div>
            )}
        </div>
    );
};

export default AlbumDashboard;
