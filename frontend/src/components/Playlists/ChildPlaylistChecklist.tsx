import React from 'react';
import PlaylistCard from './PlaylistCard';
import { PlaylistDisplay } from '../../Classes/Playlist';

interface ChildPlaylistChecklistProps {
    playlists: PlaylistDisplay[];
    selectedPlaylists: { [id: string]: boolean };
    onSelectionChange: (id: string, isSelected: boolean) => void;
}

const ChildPlaylistChecklist: React.FC<ChildPlaylistChecklistProps> = ({ playlists, selectedPlaylists, onSelectionChange }) => {
    return (
        <div className='row row-cols-4'>
            {playlists.map((playlist) => (
                // d-flex align-items-center mb-2
                <div key={playlist.id} className="col">
                    <input 
                        type="checkbox"
                        id={`checkbox-${playlist.id}`}
                        checked={selectedPlaylists[playlist.id]}
                        onChange={(e) => onSelectionChange(playlist.id, e.target.checked)}
                        className="form-check"
                    />
                    <label htmlFor={`checkbox-${playlist.id}`}>
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ChildPlaylistChecklist;
