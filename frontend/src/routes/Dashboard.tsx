import AlbumDashboardButton from '../components/AlbumDashboardButton';
import PlaylistDashboardButton from '../components/PlaylistDashboardButton';

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
