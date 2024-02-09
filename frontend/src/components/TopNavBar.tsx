import { NavLink, useLocation } from 'react-router-dom';

const TopNavBar = () => {
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a href="/dashboard" className="navbar-brand"><span className="my">My</span>Spotify</a>
                <div className="collapse navbar-collapse">
                    {pathname !== '/' && <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/dashboard/album" className="nav-link">Album Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/dashboard/playlist" className="nav-link">Playlist Dashboard</NavLink>
                        </li>
                    </ul>}
                </div>
            </div>
        </nav>
    );
};

export default TopNavBar;
