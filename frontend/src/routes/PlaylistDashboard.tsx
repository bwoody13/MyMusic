import { useEffect, useState } from "react";
import SmartPlaylists from "../components/SmartPlaylists";
import { retreivePlaylists, syncPlaylistsWithBackend } from "../utils/data_management";
import { PlaylistDisplay } from "../Classes/Playlist";

function PlaylistDashboard() {
    const [playlists, setPlaylists] = useState<PlaylistDisplay[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const playlistData = await retreivePlaylists();
                setPlaylists(playlistData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function handleUpdate() {
        setLoading(true);
        try {
            syncPlaylistsWithBackend().then(() => retreivePlaylists().then(playlistData => setPlaylists(playlistData)));
        } catch (error) {
            console.error('Error updating playlists:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Playlist Dashboard</h2>
            {loading ? <p>Updating Playlists...</p> : 
                <div>
                    <button onClick={handleUpdate}>Update Playlists</button>
                    <hr/>
                </div>}
            <SmartPlaylists playlists={playlists} playlistLoading={loading} />
        </div>
    )
}

export default PlaylistDashboard;