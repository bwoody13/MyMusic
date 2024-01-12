import React, { useEffect, useState } from "react";
import { addSmartPlaylist, getSmartPlaylists } from "../utils/backend_api_handler";
import { PlaylistDisplay } from "../Classes/Playlist";
import SmartPlaylist from "../Classes/SmartPlaylist";
import User from "../Classes/User";

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

    const handleChildChange = (event: React.ChangeEvent<HTMLInputElement>, playlistId: string) => {
        setSelectedChildPlaylists(prevState => ({
            ...prevState,
            [playlistId]: event.target.checked
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
            <h1>Smart Playlists</h1>
            <p>Create playlist hierarchies.</p>
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
                    <div>
                        Child Playlists:
                        {playlists.map(playlist => (
                            <div key={playlist.id}>
                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={selectedChildPlaylists[playlist.id]}
                                        onChange={(e) => handleChildChange(e, playlist.id)}
                                    />
                                    {playlist.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button type="submit">Create Smart Playlist</button>
                </form>
            )}
            <h2>Smart Playlists Created</h2>
            <ul>
                {smartPlaylists.map(smartPlaylist => (
                    <li>
                        <div>
                            <p>
                            Parent: {smartPlaylist.parent_playlist.name}, Children: {smartPlaylist.children.reduce((acc, childPlaylist, i) => {
                                const sep = i === 0 ? '' : ', ';
                                return acc + sep + childPlaylist.playlist.name;
                            }, '')}
                            </p>
                            <button>Sync Playlist</button>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SmartPlaylists;
