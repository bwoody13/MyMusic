import { useState } from "react";
import { AlbumDisplay } from "../../Classes/Album"
import { CustomOptionType } from "../../Classes/CustomOption";
import CustomSelect from "../CustomSelect";
import AlbumCard from "./AlbumCard";
import { recommendAlbum } from "../../utils/recommender";

type AlbumRecommenderProps = {
    albums: AlbumDisplay[];
}

function AlbumRecommender(props: AlbumRecommenderProps) {
    const {albums} = props;
    const [baseAlbum, setBaseAlbum] = useState<AlbumDisplay | null>(null);
    const [recommendedAlbum, setRecommendedAlbum] = useState<AlbumDisplay | null>(null);

    const albumOptions: CustomOptionType[] = albums.map(album => ({
        id: album.id,
        name: album.name,
        image: album.img_url,
        authors: album.artists,
      }));

    const updateBaseAlbum = (id: string) => {
        const selectedAlbum: AlbumDisplay = albums.find(album => album.id === id)!;
        setBaseAlbum(selectedAlbum);
    }

    const handleRecommendation = () => {
        if (baseAlbum) {
            recommendAlbum(baseAlbum, albums.map(album => album.id)).then(album => setRecommendedAlbum(album));
        } else {
            console.log("No base album selected.")
        }
        
    }

    return (
        <div>
            <h2 className="title">Album Recommender</h2>
            <br/>
            <div>
                <h4 className="title">Select Album to use for getting recommended Album</h4>
                <CustomSelect options={albumOptions} onSelectChange={updateBaseAlbum} />
                <button className="m-2" onClick={handleRecommendation}>Recommend Album</button>
                {recommendedAlbum && <AlbumCard album={recommendedAlbum}/>}
            </div>
        </div>
    )


}

export default AlbumRecommender;