import { PlaylistDisplay } from "../../../Classes/Playlist";

const SmallPlaylistCard: React.FC<{playlist: PlaylistDisplay}> = ({playlist}) => {
    return (
        <div className="row playlist-card">
            <div className="col-3">
                <img src={playlist.img_url} className="playlist-card-image" />
            </div>
            <div className="col-9">
                <strong className="name">{playlist.name}</strong>
                <p><small className="owner"> by {playlist.owner_name}</small></p>
            </div>
        </div>
    );
};

export default SmallPlaylistCard;