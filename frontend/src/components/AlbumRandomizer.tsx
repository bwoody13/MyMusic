import {useState} from 'react'
import { getLikedAlbums } from '../utils/api_handler';

function AlbumRandomizer() {
    const [randomAlbum, setRandomAlbum] = useState<Album | null>(null);

    async function handleRandomize() {
        try {
            const albumsData = await getLikedAlbums();
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
            <h2>Album Randomizer</h2>
            <button onClick={handleRandomize}>Randomize Album</button>
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

export default AlbumRandomizer;
