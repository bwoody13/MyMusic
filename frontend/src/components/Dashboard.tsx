import AlbumRandomizer from './AlbumRandomizer';
import SmartPlaylistManager from './SmartPlaylists';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <AlbumRandomizer />
            <SmartPlaylistManager />
        </div>
    );
};

export default Dashboard;
