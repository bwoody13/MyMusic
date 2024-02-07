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
    const [recommendations, setRecommendations] = useState<TrackDisplay[]>([]);

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
            // TODO: make calls to recommend from playlist
            recommendTracksFromPlaylist(basePlaylist).then((recommendations) => {
                setRecommendations(recommendations);
            });
        } else {
            console.log("No base playlist selected.")
        }
    }

    return (
        <div>
            <h2 className="title">Playlist Recommender</h2>
            <br />
            <div>
                <h4 className="title">Select a Playlist to use for getting recommendations</h4>
                <CustomSelect options={playlistOptions} onSelectChange={updateBasePlaylist} />
                <button className="m-2" onClick={handleRecommendation}>Recommend Tracks</button>
                {/* TODO: display recommendations better */}
                {recommendations && <div><p>Recommended Tracks:</p>
                <ul>
                    {recommendations.map((track) => (<li key={track.id}>{track.name + " by " + track.artists}</li>))}
                </ul>
                </div>}
                
            </div>
        </div>
    )
}

export default PlaylistRecommender;