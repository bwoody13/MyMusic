import { useEffect, useState } from "react";
import '../components/Playlists/Playlist.css';
import SmartPlaylists from "../components/Playlists/smart-playlist/SmartPlaylists";
import { retreivePlaylists, syncPlaylistsWithBackend } from "../utils/data_management";
import { PlaylistDisplay } from "../Classes/Playlist";
import CreatePlaylist from "../components/Playlists/CreatePlaylist";
import PlaylistRecommender from "../components/Playlists/PlaylistRecommender";
import PlaylistEnhancer from "../components/Playlists/PlaylistEnhancer";
import { usePlaylists } from "../contexts/PlaylistContext";
import { useLoading } from "../contexts/LoadingContext";

function PlaylistDashboard() {
    const {playlists, setPlaylists} = usePlaylists();
    const {isLoading, setLoading} = useLoading();

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

    function addPlaylist(playlist: PlaylistDisplay): void {
        setPlaylists([...playlists, playlist]);
    }

    return (
        <div className="playlist-dashboard">
            {/* <h1 className="title">Playlist Dashboard</h1> */}
            <div className="dashboard-content">
                {isLoading ? <p>Updating Playlists...</p> : 
                    <div>
                        <hr/>
                        <CreatePlaylist addPlaylist={addPlaylist} />
                        <hr/>
                        <PlaylistEnhancer playlists={playlists.filter(playlist => playlist.owner_id === JSON.parse(localStorage.getItem('user')!).id)} />
                        <hr/>
                        <PlaylistRecommender playlists={playlists} />
                        <hr />
                    </div>}
                <SmartPlaylists playlists={playlists} playlistLoading={isLoading} />
            </div>
        </div>
    )
}

export default PlaylistDashboard;