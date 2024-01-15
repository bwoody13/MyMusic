import { useState } from "react";
import User from "../../../Classes/User";
import { addSmartPlaylist, getSmartPlaylists } from "../../../utils/backend_api_handler";
import SmartPlaylist from "../../../Classes/SmartPlaylist";
import { PlaylistDisplay } from "../../../Classes/Playlist";
import ParentPlaylistDropdown from "./ParentPlaylistDropdown";
import ChildPlaylistChecklist from "./ChildPlaylistChecklist";

type CreateSmartPlaylistProps = {
    playlists: PlaylistDisplay[];
    setSmartPlaylists: (smartPlaylists: SmartPlaylist[]) => void;
}

const CreateSmartPlaylist: React.FC<CreateSmartPlaylistProps> = ({playlists, setSmartPlaylists}) => {
    const [parentPlaylistId, setParentPlaylistId] = useState("");
    const [selectedChildPlaylists, setSelectedChildPlaylists] = useState<{ [id: string]: boolean }>(playlists.reduce((acc, playlist) => {
        acc[playlist.id] = false; // Initialize all checkboxes as unchecked
        return acc;
    }, {} as { [id: string]: boolean }));

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
                    .then(smartPlaylists => {
                        setSmartPlaylists(smartPlaylists);
                        setParentPlaylistId('');
                        setSelectedChildPlaylists({});
                        alert("New Smart Playlist added")
                    })
            );
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <div className="parent-container">
                        <ParentPlaylistDropdown 
                            playlists={playlists.filter(playlist => playlist.owner_id === JSON.parse(localStorage.getItem('user')!).id)} 
                            selectedParentId={parentPlaylistId} 
                            onParentChange={setParentPlaylistId} 
                        />
                    </div>
                    <br/>
                    <div className="container-fluid child-container">
                        <strong>Child Playlists:</strong>
                        <ChildPlaylistChecklist 
                            playlists={playlists} 
                            selectedPlaylists={selectedChildPlaylists} 
                            onSelectionChange={handleChildChange} 
                        />
                    </div>
                    <button type="submit">Create Smart Playlist</button>
                </form>
        </div>
    )
};

export default CreateSmartPlaylist;