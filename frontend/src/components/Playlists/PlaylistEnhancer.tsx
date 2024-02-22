import { useState } from "react";
import { CustomOptionType } from "../../Classes/CustomOption";
import { PlaylistDisplay } from "../../Classes/Playlist";
import CustomSelect from "../CustomSelect";
import { recommendTracksForPlaylist } from "../../utils/recommender";
import { TrackDisplay } from "../../Classes/Track";
import TrackList from "./TrackList";

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
        try {
            recommendTracksForPlaylist(selectedPlaylist!).then((tracks) => {
                setRecommendedTracks(tracks);
                setLoadingRecs(false);
            });
        } catch (error) {
            setLoadingRecs(false);
        }
    }
    
    return (
        <div id="enhancer" className="scroll-page">
            
            <div className="row">
                <div className="col-lg-5">
                    <h2 className="title">Playlist Enhancer</h2>
                </div>
                <div className="col-lg-7">
                    <p>Select a Playlist to Enhance:</p>
                    <CustomSelect options={playlistOptions} onSelectChange={updateSelectedPlaylist} />
                </div>
            </div>
            <button className="m-2" onClick={handleSuggestions}>Get Suggestions</button>
            {loadingRecs && <p>Loading recommendations...</p>}
            {(recommendedTracks.length > 0 && selectedPlaylist) && <><p>Recommended Enhancements for {selectedPlaylist.name}:</p><TrackList tracks={recommendedTracks}/></>}
        </div>
    )
};

export default PlaylistEnhancer;