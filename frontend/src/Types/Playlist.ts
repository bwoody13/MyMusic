type Playlist = {
    id: string;
    name: string;
    description: string;
    images: Image[];
    type: string;
    owner: {display_name: string, id: string};
    tracks: any[];
}