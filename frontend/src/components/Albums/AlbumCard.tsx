import { AlbumDisplay } from "../../Classes/Album";

const AlbumCard: React.FC<{album: AlbumDisplay}> = ({album}) => {
    return (
        <div className="card container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <img className="album-card-img" src={album.img_url} alt="album cover"/>
                </div>
                <div className="col-md-9 card-body">
                    <h4>{album.name}</h4>
                    <p>by {album.artists}</p>
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;