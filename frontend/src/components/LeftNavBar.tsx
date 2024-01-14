// import { useLocation } from "react-router-dom";

const LeftNavBar = () => {

    // const location = useLocation();
    // const { pathname } = location;

    // function renderLinksForRoute() {
    //     switch (pathname) {
    //         case '/dashboard/album':
    //             return (<li className="nav-item">
    //                 <a className="nav-link active" aria-current="page" href="#">Home Album</a>
    //             </li>);
    //         case '/dashboard/playlist':
    //             return (<li className="nav-item">
    //                 <a className="nav-link active" aria-current="page" href="#">Home Playlist</a>
    //             </li>);
    //     }
    // }

    return (
        <div id='left-nav' className="d-flex flex-column flex-shrink-0 p-4 bg-dark" 
                style={{width: "280px", height: "100vh", marginLeft: "-25px", marginTop: "-20px"}}>
            <ul className="nav nav-pills flex-column mb-auto">
                {/* TODO: Render User */}
                {/* {renderLinksForRoute()} */}
                {/* More links */}
            </ul>
        </div>
    );
};

export default LeftNavBar;
