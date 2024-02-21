import { TrackDisplay } from "../../Classes/Track";

type TrackListProps = {
    tracks: TrackDisplay[];
    cols: number;
  };
  
  const TrackList: React.FC<TrackListProps> = ({ tracks, cols }) => {
    return (
      <div className="container">
        <div className={"row row-cols-" + cols}>
            {tracks.map((track, index) => (
            <div key={index} className="row align-items-center my-2">
                <div className="col-md-4">
                <img src={track.albumImage} alt={track.name} className="track-img" />
                </div>
                <div className="col-md-8">
                    <strong className="name">{track.name}</strong>
                    <p><small className="owner"> by {track.artists}</small></p>
                </div>
            </div>
            ))}
        </div>
        
      </div>
    );
  };
  
  export default TrackList;