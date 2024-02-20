import AlbumDashboardButton from '../components/Albums/AlbumDashboardButton';
import PlaylistDashboardButton from '../components/Playlists/PlaylistDashboardButton';

function Dashboard() {

    return (
        <div className='dashboard'>
            {/* <h1 className='dashboard-title'>Dashboard</h1> */}
            <div className='row justify-content-center'>
                <div className='card col-4'>
                    <AlbumDashboardButton />
                </div>
                <div className='card col-4'>
                    <PlaylistDashboardButton />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
