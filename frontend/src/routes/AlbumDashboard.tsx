import {useEffect, useState} from 'react'
import { AlbumDisplay } from '../Classes/Album';
import { retreiveAlbums, syncAlbumsWithBackend } from '../utils/data_management';

function AlbumDashboard() {
    const [randomAlbum, setRandomAlbum] = useState<AlbumDisplay | null>(null);

    const [albums, setAlbums] = useState<AlbumDisplay[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const albumsData = await retreiveAlbums();
            setAlbums(albumsData);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, []);


    function handleRandomize() {
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

    function handleUpdate() {
        setLoading(true);
        try {
            syncAlbumsWithBackend().then(() => retreiveAlbums().then(albumsData => setAlbums(albumsData)));
        } catch (error) {
            console.error('Error updating albums:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Album Dashboard</h2>
            {loading? <p>Loading Albums...</p> : 
                <div>
                    <button onClick={handleUpdate}>Update Albums</button>
                    <hr/>
                    <h3>Album Randomizer</h3>
                    <button onClick={handleRandomize}>Randomize Album</button>
                </div>}
            {randomAlbum && (
                <div>
                    <h3>{randomAlbum.name}</h3>
                    <p>{randomAlbum.artists}</p>
                    <img src={randomAlbum.img_url} alt={randomAlbum.name} width="200" />
                </div>
            )}
        </div>
    );
};

export default AlbumDashboard;
