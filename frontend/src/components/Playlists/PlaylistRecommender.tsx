import { useState } from "react";
import { CustomOptionType } from "../../Classes/CustomOption";
import { PlaylistDisplay } from "../../Classes/Playlist"
import Track, { TrackDisplay, TrackRecommendations } from "../../Classes/Track";
import CustomSelect from "../CustomSelect";
import { recommendTracksFromPlaylist } from "../../utils/recommender";

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
            <h2 className="title">Playlist Recommender</h2>
            <div className="row">
                <div className="col-5">
                    <h4 className="title">Select a Playlist to use for getting recommendations</h4>
                    <CustomSelect options={playlistOptions} onSelectChange={updateBasePlaylist} />
                    <button className="m-2" onClick={handleRecommendation}>Recommend Tracks</button>
                </div>
                <div className="col-7">
                    {recommendationBase && <div><p>Recommended Tracks for {recommendationBase?.name}:</p>
                    {loadingRecs && <p>Loading recommendations...</p>}
                    {recommendations && <ul>
                        {recommendations.map((track) => (<li key={track.id}>{track.name + " by " + track.artists}</li>))}
                    </ul>}
                    </div>}
                </div>

                
                
                
            </div>
        </div>
    )
}

export default PlaylistRecommender;