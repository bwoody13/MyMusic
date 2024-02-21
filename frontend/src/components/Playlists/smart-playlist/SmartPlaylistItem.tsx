import { useState } from 'react';
import SmartPlaylist from '../../../Classes/SmartPlaylist';
import { syncSmartPlaylist } from '../../../utils/smart_playlist';
import SmallPlaylistCard from './SmallPlaylistCard';

type SmartPlaylistItemProps = {
    smartPlaylist: SmartPlaylist;
    setIsSyncing: (isSyncing: boolean) => void;
};

const SmartPlaylistItem: React.FC<SmartPlaylistItemProps> = ({ smartPlaylist, setIsSyncing }) => {
    const [removeUnmatched, setRemoveUnmatched] = useState(false);

    function onSync() {
        setIsSyncing(true);
        try {
            syncSmartPlaylist(smartPlaylist, !removeUnmatched).then(() => {
                alert("Smart Playlist synced");
                setIsSyncing(false);
            });
        } catch (error) {
            setIsSyncing(false);
            console.error("Error syncing smart playlist");
        }
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
                <div className='row row-cols-3 row-cols-xl-4'>
                    {smartPlaylist.children.map(childPlaylist => <div className='col'><SmallPlaylistCard key={childPlaylist.playlist.id + "child"} playlist={childPlaylist.playlist} /></div>)}
                </div>
            </div>
            <div className='col-2 sync'>
                <button onClick={onSync}>Sync Playlist</button>
                <br/>
                <input type='checkbox' checked={removeUnmatched} onChange={() => setRemoveUnmatched(!removeUnmatched)} /> Remove Extraneous Parent Tracks
            </div>
        </div>
    );
};

export default SmartPlaylistItem;
