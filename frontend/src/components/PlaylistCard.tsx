import React from 'react';
import './PlaylistCard.css'; // Re-enable the import of custom CSS
import { PlaylistDisplay } from '../Classes/Playlist';

const PlaylistCard: React.FC<{ playlist: PlaylistDisplay }> = ({ playlist }) => {
    return (
            <div className="card">
                <div className="row">
                    <div className="col-md-3">
                        <img src={playlist.img_url} className="card-img" alt={playlist.name} />
                    </div>
                    <div className="col-md-9">
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

export default PlaylistCard;
