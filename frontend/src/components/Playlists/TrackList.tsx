import { TrackDisplay } from "../../Classes/Track";
import TrackLink from "./TrackLink";

type TrackListProps = {
    tracks: TrackDisplay[];
};

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    return (
        <div className="container">
            <div className={"row row-cols-md-2 row-cols-lg-3 row-cols-xl-4"}>
                {tracks.map((track, index) => (
                    <div key={index} className="row align-items-center my-2">
                        <div className="col-sm-5">
                            <img src={track.albumImage} alt={track.name} className="track-img" />
                        </div>
                        <div className="col-sm-7">
                            <strong className="name"><TrackLink track={track}/></strong>
                            <p><small className="owner"> by {track.artists}</small></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackList;