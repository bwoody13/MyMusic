import AlbumDashboardCard from './AlbumDashboardCard';
import SmartPlaylistCard from './SmartPlaylistsCard';

function Dashboard() {
    
    return (
        <div>
            <h1>Dashboard</h1>
              <>
                <AlbumDashboardCard />
                <SmartPlaylistCard />
              </>
        </div>
    );
};

export default Dashboard;
