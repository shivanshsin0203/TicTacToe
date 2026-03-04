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
      const room=gameManager.getRoom(roomId);
      if(room){
        if(room.disconnected&&room.disconnectedPlayer.includes(uniqueId)){
          room.disconnected=false;
          room.disconnectedPlayer=[];
          socket.join(roomId);
          io.to(roomId).emit("check-reconnect",room);
          gameManager.addDisconnectedPlayer(roomId,uniqueId,socket.id);
        }
        else{
         return 
        }
      }
      else{
      socket.join(roomId);
      console.log(`Player joined room:${roomId} and with id:${uniqueId}`);
      const playerCount = waitingRoomService.addPlayer(roomId, uniqueId,socket.id);
      if (playerCount === 2) {
        const players = waitingRoomService.getPlayer(roomId);
        if (players && players[0] && players[1]) {
          const state = gameManager.addRoom(roomId, players[0], players[1]);
          io.to(roomId).emit("start-game", state);
          waitingRoomService.removeWaiting(roomId);
        }
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
              room.player1points === 3 ? room.player1 +" wins" : room.player2 +" wins",
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
    socket.on("disconnect-win",(data:{
      roomId:string;
      disconnectedPlayerId:string;
    })=>{
      const room=gameManager.getRoom(data.roomId);
      if(room){
        room.player1points=3;
        gameManager.removeRoom(data.roomId);
      }
    })
    socket.on("disconnect",()=>{
      console.log("Player disconnected:",socket.id);
      const player=gameManager.getDisconnectedPlayer(socket.id);
      if(player){
        gameManager.removeDisconnectedPlayer(socket.id);
        const room=gameManager.getRoom(player.RoomId);
        if(room){
          room.disconnected=true;
          room.disconnectedPlayer.push(player.playerId);
          if(room.disconnectedPlayer.length===2){
            io.to(player.RoomId).emit("game-over","Draw");
            gameManager.removeRoom(player.RoomId);
          }
          else{
            io.to(player.RoomId).emit("player-disconnected",room.disconnectedPlayer[0]);
          }
        }
      }
    })
  });
};
