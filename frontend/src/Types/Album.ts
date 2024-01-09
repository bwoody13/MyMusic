type Album = {
    id: string;
    name: string;
    images: {url: string}[];
    type: string;
    artists: {id: string, name: string}[];
    tracks: any[];
    genres: string[];
};

