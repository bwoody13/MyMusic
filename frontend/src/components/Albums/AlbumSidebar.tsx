const AlbumSidebar: React.FC<{ handleUpdate: () => void }> = ({handleUpdate}) => {

    return (
        <>
            <button className='mt-2' onClick={handleUpdate}>Update Albums</button>
            <a href="#randomizer">Album Randomizer</a>
            <a href="#recommender">Album Recommender</a>
        </>
    )
}

export default AlbumSidebar;