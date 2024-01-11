import { useNavigate } from 'react-router-dom';


function AlbumDashboardCard() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/dashboard/album');
    };

    return (
        <div>
            <h2>Album Management</h2>
            <button onClick={handleNavigate}>Go to Album Dashboard</button>
        </div>
    );
};

export default AlbumDashboardCard;