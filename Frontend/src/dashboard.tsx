import { useNavigate } from "react-router";

function Dashboard(){
    const navigate=useNavigate();
    const createRoom = () => {
        const roomId=Math.floor(Math.random()*1000000);
        const uniqueId=Math.random().toString(36).substring(2, 15);
        navigate("/gameroom/"+roomId+"/"+uniqueId);
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={createRoom}>
                Create Room
            </button>
            <button>
                Join Room
            </button>   
        </div>
    )
}
export default Dashboard;