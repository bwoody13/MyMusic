import AlbumDashboardButton from '../components/Albums/AlbumDashboardButton';
import PlaylistDashboardButton from '../components/Playlists/PlaylistDashboardButton';

function Dashboard() {
    
    return (
        <div>
            <h1>Dashboard</h1>
              <>
                <AlbumDashboardButton />
                <PlaylistDashboardButton />
              </>
        </div>
    );
};

export default Dashboard;
