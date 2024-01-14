import {useEffect, useState} from 'react';
import { AlbumDisplay } from '../Classes/Album';
import { retreiveAlbums, syncAlbumsWithBackend } from '../utils/data_management';
import AlbumCard from '../components/Albums/AlbumCard';
import AlbumCollage from '../components/Albums/AlbumCollage';
import '../components/Albums/Album.css'
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
            <h2 className='title'>Album Dashboard</h2>
            {loading? <p>Loading Albums...</p> : 
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
