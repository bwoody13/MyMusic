import React from 'react';
import SmartPlaylist, { ChildPlaylist } from '../../../Classes/SmartPlaylist';
import { syncSmartPlaylist } from '../../../utils/smart_playlist';
import SmallPlaylistCard from './SmallPlaylistCard';

type SmartPlaylistItemProps = {
    smartPlaylist: SmartPlaylist;
};

const SmartPlaylistItem: React.FC<SmartPlaylistItemProps> = ({ smartPlaylist }) => {
    function onSync() {
        syncSmartPlaylist(smartPlaylist).then(() => console.log("Smart Playlist synced"));
    }

    return (
        <div className='row card smart-playlist-card'>
            <div className='col-2'>
                <div className='row'>
                    <div className=''>
                        <p>Parent:</p>
                    </div>
                    <div className=''>
                        <SmallPlaylistCard key={smartPlaylist.parent_playlist.id + "parent"} playlist={smartPlaylist.parent_playlist} />
                    </div>
                </div>
            </div>
            <div className='col-8'>
                <p>Children:</p>
                <div className='row row-cols-4'>
                    {smartPlaylist.children.map(childPlaylist => <div className='col'><SmallPlaylistCard key={childPlaylist.playlist.id} playlist={childPlaylist.playlist} /></div>)}
                </div>
            </div>
            <div className='col-2 sync'>
                <button onClick={onSync}>Sync Playlist</button>
            </div>
        </div>
    );
};

export default SmartPlaylistItem;
