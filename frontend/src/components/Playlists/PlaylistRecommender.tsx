import { useState } from "react";
import { CustomOptionType } from "../../Classes/CustomOption";
import { PlaylistDisplay } from "../../Classes/Playlist"
import Track, { TrackDisplay, TrackRecommendations } from "../../Classes/Track";
import CustomSelect from "../CustomSelect";
import { recommendTracksFromPlaylist } from "../../utils/recommender";
import TrackList from "./TrackList";

type PlaylistRecommenderProps = {
    playlists: PlaylistDisplay[];
}

function PlaylistRecommender({ playlists }: PlaylistRecommenderProps) {

    const [basePlaylist, setBasePlaylist] = useState<PlaylistDisplay | null>(null);
    const [recommendationBase, setRecommendationBase] = useState<PlaylistDisplay | null>(null);
    const [recommendations, setRecommendations] = useState<TrackDisplay[]>([]);
    const [loadingRecs, setLoadingRecs] = useState(false);

    const playlistOptions: CustomOptionType[] = playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        image: playlist.img_url,
        authors: playlist.owner_name
    }));

    const updateBasePlaylist = (id: string) => {
        const selectedPlaylist = playlists.find((playlist) => playlist.id === id)!;
        setBasePlaylist(selectedPlaylist);
    }

    const handleRecommendation = () => {
        if (basePlaylist) {
            setRecommendationBase(basePlaylist);
            setLoadingRecs(true);
            recommendTracksFromPlaylist(basePlaylist).then((recommendations) => {
                setRecommendations(recommendations);
                setLoadingRecs(false);
            });
        } else {
            console.log("No base playlist selected.")
        }
    }

    return (
        <div id="recommender" className="scroll-page">
            <div className="row">
                <div className="col-5">
                    <h2 className="title">Playlist Recommender</h2>
                    
                    <button className="m-2" onClick={handleRecommendation}>Recommend Tracks</button>
                </div>
                <div className="col-7">
                    <p>Select a Playlist to use for getting recommendations</p>
                    <CustomSelect options={playlistOptions} onSelectChange={updateBasePlaylist} />
                    
                </div>
                {recommendationBase && <div><p>Recommended Tracks for {recommendationBase?.name}:</p>
                {loadingRecs && <p>Loading recommendations...</p>}
                {/* {recommendations && <ul>
                    {recommendations.map((track) => (<li key={track.id}>{track.name + " by " + track.artists}</li>))}
                </ul>} */}
                {recommendations && <TrackList tracks={recommendations} cols={4}/>}
                </div>}
                
                
                
            </div>
        </div>
    )
}

export default PlaylistRecommender;