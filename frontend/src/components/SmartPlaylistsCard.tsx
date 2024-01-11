import { useNavigate } from 'react-router-dom';

function SmartPlaylistCard() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/smart-playlists');
    };

    return (
        <div>
            <h2>Smart Playlist Manager</h2>
            <button onClick={handleNavigate}>Manage Smart Playlists</button>
        </div>
    );
};

export default SmartPlaylistCard;
