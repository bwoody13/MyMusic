const TopNavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a href="/dashboard" className="navbar-brand h1">MySpotify</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* <Link className="nav-link" to="/dashboard/artist">Artist Dashboard</Link> */}
                            <a className="nav-link" href="/dashboard/album">Album Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard/playlist">Playlist Dashboard</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default TopNavBar;
