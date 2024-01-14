import React from 'react';
import { PlaylistDisplay } from '../../../Classes/Playlist';

const ChildPlaylistCard: React.FC<{ playlist: PlaylistDisplay, isChecked: boolean }> = ({ playlist, isChecked }) => {
    return (
            <div className="card">
                <div className="row">
                    <div className="col-md-4">
                        <div className='card-img-container'>
                            <img src={playlist.img_url} className="card-img" alt={playlist.name} />
                            {isChecked && <div className="overlay-checkmark"></div>}
                        </div>
                        
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <strong className="card-title">{playlist.name}</strong>
                            <p className="card-text"><small className="text-muted">By {playlist.owner_name}</small></p>
                            <p className="card-text">{playlist.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ChildPlaylistCard;
