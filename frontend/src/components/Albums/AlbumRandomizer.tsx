import { useState } from "react";
import { AlbumDisplay } from "../../Classes/Album"
import AlbumCard from "./AlbumCard";

type AlbumRandomizerProps = {
    albums: AlbumDisplay[];
}

function AlbumRandomizer(props: AlbumRandomizerProps) {
    const {albums} = props;
    const [randomAlbum, setRandomAlbum] = useState<AlbumDisplay | null>(null);


    function handleRandomize() {
        try {
            const albumsData = albums;
            if (albumsData && albumsData.length > 0) {
                const randomIndex = Math.floor(Math.random() * albumsData.length);
                setRandomAlbum(albumsData[randomIndex]);
                console.log(albumsData[randomIndex])
            } else {
                console.log('No liked albums found');
            }
        } catch (error) {
            console.error('Error fetching albums:', error);
            // Handle the error appropriately
        }
    };

    return (
        <div>
            <h3 className="title">Album Randomizer</h3>
            <button className="m-2" onClick={handleRandomize}>Randomize Album</button>
            {randomAlbum && <AlbumCard album={randomAlbum}/>}
        </div>
    );

};

export default AlbumRandomizer;