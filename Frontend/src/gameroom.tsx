import { useParams } from "react-router";
import { useSocket } from "./lib/socket";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
interface GameState {
  gameState: string[][];
  turn: string;
  player1: string;
  player2: string;
  player1Symbol: string;
  player2Symbol: string;
  player1points: number;
  player2points: number;
}
function GameRoom() {
  const params = useParams();
  const socket = useSocket("dsadsd");
  const [startGame, setStartGame] = useState(false);
  const [gameState, setGameState] = useState<GameState>();

  const handleCellClick = (row: number, col: number, cell: string) => {
    if (!socket || !gameState) return;
    if (gameState.turn !== params.uniqueId) {
      toast.error("Not Your Turn");
      return;
    }
    console.log(cell);
    if (cell != "empty") {
      toast.error("Cell Already Filled");
      return;
    }
    socket.current?.emit("make-move", {
      roomId: params.id,
      row,
      col,
      playerId: params.uniqueId,
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.current?.emit("join-room", params.id, params.uniqueId);
    socket.current?.on("start-game", (data: GameState) => {
      console.log(data);
      console.log(data.turn);
      setStartGame(true);
      setGameState(data);
    });
    socket.current?.on("game-state",(data:GameState)=>{
      setGameState(data);
    })
  }, [socket, params.id, params.uniqueId]);
  return (
    <div>
      <h1>GameRoom</h1>
      <p>Room ID: {params.id}</p>
      {startGame && (
        <div>
          <div className="grid grid-cols-3 w-fit mx-auto my-5">
            {gameState?.gameState.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-24 h-24 flex items-center justify-center text-3xl font-bold
                    ${colIndex < 2 ? "border-r-2 border-r-gray-800" : ""}
                    ${rowIndex < 2 ? "border-b-2 border-b-gray-800" : ""}
                    ${cell === "empty" ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => handleCellClick(rowIndex, colIndex, cell)}
                >
                  {cell === "empty" ? "" : cell}
                </div>
              )),
            )}
          </div>

          <h2>Game State</h2>
          <p>Turn: {gameState?.turn}</p>
          <p>Player 1: {gameState?.player1}</p>
          <p>Player 2: {gameState?.player2}</p>
          <p>Player 1 Symbol: {gameState?.player1Symbol}</p>
          <p>Player 2 Symbol: {gameState?.player2Symbol}</p>
          <p>Player 1 Points: {gameState?.player1points}</p>
          <p>Player 2 Points: {gameState?.player2points}</p>
        </div>
      )}
      <Toaster />
    </div>
  );
}
export default GameRoom;
