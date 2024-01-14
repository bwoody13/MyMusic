import React, { useState } from 'react';
import { createPlaylist } from '../../utils/spotify_api_handler';
import { updatePlaylists } from '../../utils/backend_api_handler';
import './CreatePlaylist.css';
import { PlaylistDisplay } from '../../Classes/Playlist';
import { playlistToPlaylistDisplay } from '../../utils/helpers';

interface CreatePlaylistModalProps {
    show: boolean;
    onHide: () => void;
    addPlaylist: (playlist: PlaylistDisplay) => void;
}

const CreateaPlaylistModal: React.FC<CreatePlaylistModalProps> = ({ show, onHide, addPlaylist }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const playlistData = {
            name: playlistName,
            description: playlistDescription,
            public: isPublic,
        };
        createPlaylist(playlistData).then((playlist): void => {
            updatePlaylists([playlist]);
            addPlaylist(playlistToPlaylistDisplay(playlist));
        });
        // Hide the modal on successful creation
        onHide();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="custom-modal">
                <div className="custom-modal-content">
                    <span className="custom-close" onClick={onHide}>&times;</span>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-4'>
                                <p>Playlist Name:</p>
                            </div>
                            <div className='col-8'>
                                <input
                                    type="text"
                                    value={playlistName}
                                    onChange={(e) => setPlaylistName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p>Description:</p>
                            </div>
                            <div className='col-8'>
                                <textarea
                                    value={playlistDescription}
                                    onChange={(e) => setPlaylistDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p>Public:</p>
                            </div>
                            <div className='col-8'>
                                <label className='radio-label'>
                                    <input
                                        type="radio"
                                        name="isPublic"
                                        checked={isPublic === true}
                                        onChange={() => setIsPublic(true)}
                                    />
                                    Yes
                                </label>
                                <label className='radio-label'>
                                    <input
                                        type="radio"
                                        name="isPublic"
                                        checked={isPublic === false}
                                        onChange={() => setIsPublic(false)}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default CreateaPlaylistModal;
