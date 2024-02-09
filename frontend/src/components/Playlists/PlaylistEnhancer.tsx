import { useState } from "react";
import { CustomOptionType } from "../../Classes/CustomOption";
import { PlaylistDisplay } from "../../Classes/Playlist";
import CustomSelect from "../CustomSelect";
import { recommendTracksForPlaylist } from "../../utils/recommender";
import { TrackDisplay } from "../../Classes/Track";

const PlaylistEnhancer: React.FC<{playlists: PlaylistDisplay[]}> = ({playlists}) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistDisplay | null>(null);
    const [recommendedTracks, setRecommendedTracks] = useState<TrackDisplay[]>([]);
    const [loadingRecs, setLoadingRecs] = useState(false);



    const playlistOptions: CustomOptionType[] = playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        image: playlist.img_url,
        authors: playlist.owner_name
    }));

    const updateSelectedPlaylist = (id: string) => {
        setRecommendedTracks([])
        const selectedPlaylist = playlists.find((playlist) => playlist.id === id)!;
        setSelectedPlaylist(selectedPlaylist);
    }

    const handleSuggestions = () => {
        setLoadingRecs(true);
        recommendTracksForPlaylist(selectedPlaylist!).then((tracks) => {
            setRecommendedTracks(tracks);
            setLoadingRecs(false);
        });
    }
    

    return (
        <div>
            <h2>Playlist Enhancer</h2>
            <CustomSelect options={playlistOptions} onSelectChange={updateSelectedPlaylist} />
            {selectedPlaylist &&
                <div>
                    <p>Playlist Selected: {selectedPlaylist.name + " by " + selectedPlaylist.owner_name}</p>
                    <button className="m-2" onClick={handleSuggestions}>Get Suggestions</button>
                    {loadingRecs && <p>Loading recommendations...</p>}
                    {recommendedTracks && <ul>
                    {recommendedTracks.map((track) => (<li key={track.id}>{track.name + " by " + track.artists}</li>))}
                </ul>}
                </div>
                }
        </div>
    )
};

export default PlaylistEnhancer;