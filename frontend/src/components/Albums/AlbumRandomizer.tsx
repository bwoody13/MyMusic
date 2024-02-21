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
        }
    };

    return (
        <div id="randomizer" className="scroll-page row">
            <div className="col-4">
                <h2 className="title">Album Randomizer</h2>
                <button className="m-2" onClick={handleRandomize}>Randomize Album</button>  
            </div>
            <div className="col-8">
                {randomAlbum && <AlbumCard album={randomAlbum}/>}
            </div>
        </div>
    );

};

export default AlbumRandomizer;