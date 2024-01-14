import {useEffect, useState} from 'react';
import '../components/Albums/Album.css'
import { AlbumDisplay } from '../Classes/Album';
import { retreiveAlbums, syncAlbumsWithBackend } from '../utils/data_management';
import AlbumCollage from '../components/Albums/AlbumCollage';
import AlbumRandomizer from '../components/Albums/AlbumRandomizer';

function AlbumDashboard() {
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


    

    function handleUpdate() {
        setLoading(true);
        try {
            syncAlbumsWithBackend().then(() => retreiveAlbums().then(albumsData => {
                    setAlbums(albumsData);
                    setLoading(false);
                }));
        } catch (error) {
            console.error('Error updating albums:', error);
            setLoading(false);    
        }
    };

    return (
        <div>
            <h1 className='title'>Album Dashboard</h1>
            {loading? <p>Loading Albums From Spotify... This may take a moment.</p> : 
            <div>
                <AlbumCollage albums={albums} />
                <div className='dashboard-content'>
                    <div>
                        <button className='mt-2' onClick={handleUpdate}>Update Albums</button>
                        <hr/>
                    </div>
                <AlbumRandomizer albums={albums} />
                </div>
                
            </div>}
        </div>
    );
};

export default AlbumDashboard;
