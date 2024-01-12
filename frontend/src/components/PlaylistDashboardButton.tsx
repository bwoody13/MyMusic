import { useNavigate } from 'react-router-dom';

function PlaylistDashboardButton() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/dashboard/playlist');
    };

    return (
        <div>
            <h2>Playlist Manager</h2>
            <button onClick={handleNavigate}>Manage Playlists</button>
        </div>
    );
};

export default PlaylistDashboardButton;
