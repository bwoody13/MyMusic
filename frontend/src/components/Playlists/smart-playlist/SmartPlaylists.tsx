import React, { useEffect, useState } from "react";
import { addSmartPlaylist, getSmartPlaylists } from "../../../utils/backend_api_handler";
import { PlaylistDisplay } from "../../../Classes/Playlist";
import SmartPlaylist from "../../../Classes/SmartPlaylist";
import User from "../../../Classes/User";
import ChildPlaylistChecklist from "./ChildPlaylistChecklist";
import SmartPlaylistItem from "./SmartPlaylistItem";

type SmartPlaylistsProps = {
    playlists: PlaylistDisplay[];
    playlistLoading: boolean;
}


function SmartPlaylists(props: SmartPlaylistsProps) {
    const [parentPlaylistId, setParentPlaylistId] = useState("");
    const [selectedChildPlaylists, setSelectedChildPlaylists] = useState<{ [id: string]: boolean }>({});
    const [smartPlaylists, setSmartPlaylists] = useState<SmartPlaylist[]>([]);
    const [loading, setLoading] = useState(false);


    const {playlists, playlistLoading} = props;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const smartPlaylistData = await getSmartPlaylists();
                const initialChildSelection = playlists.reduce((acc, playlist) => {
                    acc[playlist.id] = false; // Initialize all checkboxes as unchecked
                    return acc;
                }, {} as { [id: string]: boolean });
                setSelectedChildPlaylists(initialChildSelection);
                setSmartPlaylists(smartPlaylistData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleParentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParentPlaylistId(event.target.value);
    };

    const handleChildChange = (playlistId: string, isSelected: boolean) => {
        setSelectedChildPlaylists((prevState) => ({
            ...prevState,
            [playlistId]: isSelected,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const childPlaylistIds = Object.keys(selectedChildPlaylists).filter(id => selectedChildPlaylists[id]);
        const user: User = JSON.parse(localStorage.getItem('user') || '{}');
        const smartPlaylistData = {
            parent_playlist_id: parentPlaylistId,
            children: childPlaylistIds,
            owner_id: user.id
        };
        console.log(smartPlaylistData);
        addSmartPlaylist(smartPlaylistData)
            .then(() => 
                getSmartPlaylists()
                    .then(smartPlaylists => setSmartPlaylists(smartPlaylists))
            );
    };

    return (
        <div>
            <h2>Smart Playlists</h2>
            {loading ? <p>Loading Smart Playlists...</p> : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Parent Playlist:
                        <select value={parentPlaylistId} onChange={handleParentChange}>
                            <option value="">Select Parent Playlist</option>
                            {playlists.map(playlist => (
                                <option key={playlist.id} value={playlist.id}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="container-fluid">
                        <p>Child Playlists:</p>
                        <ChildPlaylistChecklist 
                            playlists={playlists} 
                            selectedPlaylists={selectedChildPlaylists} 
                            onSelectionChange={handleChildChange} 
                        />
                    </div>
                    <button type="submit">Create Smart Playlist</button>
                </form>
            )}
            <h4>Smart Playlists Created</h4>
            <ul>
                {smartPlaylists.map(smartPlaylist => <SmartPlaylistItem key={smartPlaylist.parent_playlist.id} smartPlaylist={smartPlaylist} />)}
            </ul>
        </div>
    );
}

export default SmartPlaylists;
