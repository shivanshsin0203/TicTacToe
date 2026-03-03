import GameService from "./gameService";
interface Room{
    roomId:string;
    player1:string;
    player2:string;
    player1Symbol:string;
    player2Symbol:string;
    player1points:number;
    player2points:number;
}
class GameManager {
   public rooms:Map<string,GameService>=new Map();
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
   getAllRooms(){
    let room:Room[]=[];
    this.rooms.forEach((value,key)=>{
        room.push({
            roomId:key,
            player1:value.player1,
            player2:value.player2,
            player1Symbol:value.player1Symbol,
            player2Symbol:value.player2Symbol,
            player1points:value.player1points,
            player2points:value.player2points
        })
     })
     return room;
   }   
}
const gameManager=new GameManager();
export default gameManager;