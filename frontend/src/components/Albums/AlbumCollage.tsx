import { AlbumDisplay } from "../../Classes/Album";

type AlbumCollageProps = {
    albums: AlbumDisplay[];
}

const AlbumCollage = (props: AlbumCollageProps) => {
    const {albums} = props
    return (
        <div className="album-collage">
            {albums.sort(() => Math.random() - 0.5).map(album => (
                <img key={album.id} src={album.img_url} alt={album.name} className="album-cover" />
            ))}
        </div>
    );
};

export default AlbumCollage;