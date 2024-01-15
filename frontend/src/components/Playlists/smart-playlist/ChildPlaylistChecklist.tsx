import React from 'react';
import ChildPlaylistCard from './ChildPlaylistCard';
import { PlaylistDisplay } from '../../../Classes/Playlist';

interface ChildPlaylistChecklistProps {
    playlists: PlaylistDisplay[];
    selectedPlaylists: { [id: string]: boolean };
    onSelectionChange: (id: string, isSelected: boolean) => void;
}

const ChildPlaylistChecklist: React.FC<ChildPlaylistChecklistProps> = ({ playlists, selectedPlaylists, onSelectionChange }) => {
    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4'>
            {playlists.map((playlist) => (
                <div key={playlist.id} className="col p-3">
                    <label>
                    <input 
                        type="checkbox"
                        id={`checkbox-${playlist.id}`}
                        checked={selectedPlaylists[playlist.id]}
                        onChange={(e) => onSelectionChange(playlist.id, e.target.checked)}
                        className="form-check"
                    />
                    <ChildPlaylistCard key={playlist.id} playlist={playlist} isChecked={selectedPlaylists[playlist.id]} />
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ChildPlaylistChecklist;
