import React, { useEffect, useState } from "react";
import { addSmartPlaylist, getSmartPlaylists } from "../../../utils/backend_api_handler";
import { PlaylistDisplay } from "../../../Classes/Playlist";
import SmartPlaylist from "../../../Classes/SmartPlaylist";
import User from "../../../Classes/User";
import ChildPlaylistChecklist from "./ChildPlaylistChecklist";
import SmartPlaylistItem from "./SmartPlaylistItem";
import ParentPlaylistDropdown from "./ParentPlaylistDropdown";
import SmartPlaylistsCreated from "./SmartPlaylistsCreated";
import CreateSmartPlaylist from "./CreateSmartPlaylist";

type SmartPlaylistsProps = {
    playlists: PlaylistDisplay[];
    playlistLoading: boolean;
}


function SmartPlaylists(props: SmartPlaylistsProps) {
    
    const [smartPlaylists, setSmartPlaylists] = useState<SmartPlaylist[]>([]);
    const [loading, setLoading] = useState(false);


    const {playlists, playlistLoading} = props;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const smartPlaylistData = await getSmartPlaylists();
                // const initialChildSelection = playlists.reduce((acc, playlist) => {
                //     acc[playlist.id] = false; // Initialize all checkboxes as unchecked
                //     return acc;
                // }, {} as { [id: string]: boolean });
                // setSelectedChildPlaylists(initialChildSelection);
                setSmartPlaylists(smartPlaylistData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Smart Playlists</h2>
            {loading || playlistLoading ? <p>Loading Smart Playlists...</p> : (
                <CreateSmartPlaylist playlists={playlists} setSmartPlaylists={setSmartPlaylists} />
            )}
            <hr/>
            <SmartPlaylistsCreated smartPlaylists={smartPlaylists} />
        </div>
    );
}

export default SmartPlaylists;
