import { useState } from "react";
import SmartPlaylist from "../../../Classes/SmartPlaylist";
import SmartPlaylistItem from "./SmartPlaylistItem";

const SmartPlaylistsCreated: React.FC<{smartPlaylists: SmartPlaylist[]}> = ({smartPlaylists}) => {
    const [isSyncing, setIsSyncing] = useState(false);

    return (
        <div>
            <h4>Smart Playlists Created</h4>
            {isSyncing ? <p>Please wait, we are syncing a smart playlist.</p> : smartPlaylists.map(smartPlaylist => <SmartPlaylistItem key={smartPlaylist.parent_playlist.id} smartPlaylist={smartPlaylist} setIsSyncing={setIsSyncing} />)}
        </div>
    );
};

export default SmartPlaylistsCreated;