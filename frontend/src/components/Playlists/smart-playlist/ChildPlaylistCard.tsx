import React from 'react';
import { PlaylistDisplay } from '../../../Classes/Playlist';
import parse from 'html-react-parser'

const ChildPlaylistCard: React.FC<{ playlist: PlaylistDisplay, isChecked: boolean }> = ({ playlist, isChecked }) => {
    return (
            <div className="card">
                <div className="row">
                    <div className=" col-12 col-md-4">
                        <div className='card-img-container'>
                            <img src={playlist.img_url} className="card-img" alt={playlist.name} />
                            {isChecked && <div className="overlay-checkmark"></div>}
                        </div>
                        
                    </div>
                    <div className=" col-12 col-md-8">
                        <div className="card-body">
                            <strong className="card-title">{parse(playlist.name)}</strong>
                            <p className="card-text"><small className="text-muted">By {parse(playlist.owner_name)}</small></p>
                            <p className="card-text">{parse(playlist.desc)}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ChildPlaylistCard;
