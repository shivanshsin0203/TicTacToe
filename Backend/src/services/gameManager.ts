import GameService from "./gameService";

class GameManager {
   private rooms:Map<string,GameService>=new Map();
   addRoom(roomId:string,player1:string,player2:string){
    this.rooms.set(roomId,new GameService(player1,player2,roomId));
    const room=this.rooms.get(roomId);
    return {
        gameState:room?.gameState,
        turn:room?.turn,
        player1:room?.player1,
        player2:room?.player2,
        player1Symbol:room?.player1Symbol,
        player2Symbol:room?.player2Symbol,
        player1points:room?.player1points,
        player2points:room?.player2points
    }
    }
   getRoom(roomId:string){
    return this.rooms.get(roomId);
   }
   removeRoom(roomId:string){
    this.rooms.delete(roomId);
   }   
}
const gameManager=new GameManager();
export default gameManager;