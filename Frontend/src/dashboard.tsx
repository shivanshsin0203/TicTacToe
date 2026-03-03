import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
interface Room {
  roomId: string;
  player1: string;
  player2: string;
  player1Symbol: string;
  player2Symbol: string;
  player1points: number;
  player2points: number;
}
function Dashboard() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]|[]>([]);
  const createRoom = () => {
    const roomId = Math.floor(Math.random() * 1000000);
    const uniqueId = Math.random().toString(36).substring(2, 15);
    navigate("/gameroom/" + roomId + "/" + uniqueId);
  };
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get("http://localhost:3001/rooms");
      const data = response.data;
      console.log(data);
      setRooms(data);
    };

    fetchRooms();
    const interval = setInterval(() => {
      fetchRooms();
    }, 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <h1>Dashboard</h1>
      <button onClick={createRoom}>Create Room</button>
      <button className=" gap-x-3.5">Join Room</button>
      <div className=" gap-x-3.5 p-2 flex flex-col scroll-auto w-3/4 h-1/4 bg-cyan-950 border-2 border-white rounded-lg">
        {rooms.map((room, index) => (
          <div key={index} className=" flex flex-row gap-x-1.5">
            <p>{room.player1}</p>
            <p>{`{${room.player1Symbol}}`}</p>
            <p>:</p>
            <p>{room.player2}</p>
            <p>{`{${room.player2Symbol}}`}</p>
            <p>{room.player1points}</p>
            <p>{room.player2points}</p>
            <button className=" cursor-pointer" onClick={() => navigate("/watchparty/" + room.roomId)}>Watch</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
