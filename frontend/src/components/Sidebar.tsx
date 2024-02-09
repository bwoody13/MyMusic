import { NavLink, useLocation } from 'react-router-dom';
import User from '../Classes/User';

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'active' : '';

const Sidebar: React.FC = () => {
    const { pathname } = useLocation();
    let userLS = localStorage.getItem('user');
    const user: User | null = userLS ? JSON.parse(userLS) : null;

    if (pathname === '/')
        return <></>
        // return <div className="sidebar bg-dark"></div>;

    return (
        <div className="sidebar bg-dark">
            {/* Display user info if logged in */}
            {user && (
                <div className="user-info">
                    <img src={user.images.length > 0 ? user.images[0].url : ""} alt="User" className="user-profile-img" />
                    <br/>
                    <p className="user-name">{user.display_name}</p>
                </div>
            )}
            
            {pathname === "/dashboard/album" && (<>
                <a href="#randomizer">Album Randomizer</a>
                <a href="#recommender">Album Recommender</a>
            </>)}
            {pathname === "/dashboard/playlist" && (<>
                <a href='#create'>Create Playlist</a>
                <a href='#enhancer'>Enhance Playlist</a>
                <a href='#recommender'>Recommend New Playlist</a>
                <a href='#smart'>Smart Playlists</a>
                <a href='#created-sp'>Created Smart Playlists</a>
            </>)}
            <hr/>
            <NavLink to="/dashboard" className={getActiveLinkClass}>Dashboard</NavLink>
            {/* Conditional Links based on current route */}
            

            {/* Additional conditional content can be added similarly */}
            <NavLink to="/" className={getActiveLinkClass}>Login to New User</NavLink>
        </div>
    );
};

export default Sidebar;
