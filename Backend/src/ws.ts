import { Server, Socket } from "socket.io";
import { get, Server as HttpServer } from "http";
import gameManager from "./services/gameManager";
import waitingRoomService from "./services/waitingRoomService";

export const initWs = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("Player connected:", socket.id);
    socket.on("join-room", (roomId: string, uniqueId: string) => {
      socket.join(roomId);
      console.log(`Player joined room:${roomId} and with id:${uniqueId}`);
      const playerCount = waitingRoomService.addPlayer(roomId, uniqueId);
      if (playerCount === 2) {
        const players = waitingRoomService.getPlayer(roomId);
        if (players && players[0] && players[1]) {
          const state = gameManager.addRoom(roomId, players[0], players[1]);
          io.to(roomId).emit("start-game", state);
          waitingRoomService.removeWaiting(roomId);
        }
      }
    });
    socket.on(
      "make-move",
      (data: {
        roomId: string;
        row: number;
        col: number;
        playerId: string;
      }) => {
        const room = gameManager.getRoom(data.roomId);
        if (room) {
          room.makeMove(data.row, data.col, data.playerId);
          io.to(data.roomId).emit("game-state", room);
          if (room.player1points === 3 || room.player2points === 3) {
            io.to(data.roomId).emit(
              "game-over",
              room.player1points === 3 ? room.player1 : room.player2,
            );
            gameManager.removeRoom(data.roomId);
          }
        }
      },
    );
    socket.on("join-watching", (roomId: string) => {
      socket.join(roomId);
      const room=gameManager.getRoom(roomId);
      if(room){
        socket.emit("start-watching",room);
      }
    });
  });
};
