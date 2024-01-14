import React, { useState } from 'react';
import { createPlaylist } from '../../utils/spotify_api_handler';
import { updatePlaylists } from '../../utils/backend_api_handler';
import './CreatePlaylist.css';

interface CreatePlaylistModalProps {
    show: boolean;
    onHide: () => void;
}

const CreateaPlaylistModal: React.FC<CreatePlaylistModalProps> = ({ show, onHide }) => {
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
        createPlaylist(playlistData).then((playlist) => updatePlaylists([playlist]));
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
            {/* <div className="modal"> */}
                {/* <div className="modal-content"> */}
                    {/* <span className="close" onClick={onHide}>&times;</span> */}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Playlist Name:
                            <input
                                type="text"
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={playlistDescription}
                                onChange={(e) => setPlaylistDescription(e.target.value)}
                            ></textarea>
                        </label>
                        <div>
                            <label>
                                Public:
                                <input
                                    type="radio"
                                    name="isPublic"
                                    checked={isPublic === true}
                                    onChange={() => setIsPublic(true)}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="isPublic"
                                    checked={isPublic === false}
                                    onChange={() => setIsPublic(false)}
                                />
                                No
                            </label>
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateaPlaylistModal;
