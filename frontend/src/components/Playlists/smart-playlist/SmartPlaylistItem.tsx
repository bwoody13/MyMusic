import React from 'react';
import SmartPlaylist from '../../../Classes/SmartPlaylist';
import { syncSmartPlaylist } from '../../../utils/smart_playlist';

type SmartPlaylistItemProps = {
  smartPlaylist: SmartPlaylist;
};

const SmartPlaylistItem: React.FC<SmartPlaylistItemProps> = ({ smartPlaylist}) => {
    function onSync() {
        syncSmartPlaylist(smartPlaylist).then(() => console.log("Smart Playlist synced"));
    }

  return (
    <li>
      <div>
        <p>
          Parent: {smartPlaylist.parent_playlist.name}, Children: {smartPlaylist.children.map(child => child.playlist.name).join(', ')}
        </p>
        <button onClick={onSync}>Sync Playlist</button>
      </div>
    </li>
  );
};

export default SmartPlaylistItem;
