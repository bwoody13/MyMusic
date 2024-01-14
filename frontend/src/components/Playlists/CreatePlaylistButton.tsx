import React, { useState } from 'react';
import CreatePlaylistModal from './CreatePlaylistModal';

const NewPlaylistButton: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    return (
        <>
            <h3>Create a New Playlist</h3>
            <button onClick={openModal}>Create New Playlist</button>
            <CreatePlaylistModal show={modalVisible} onHide={closeModal} />
        </>
    );
};

export default NewPlaylistButton;
