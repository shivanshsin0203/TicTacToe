class WaitingRoomService {
    private waiting:Map<string,string[]>=new Map();
    addPlayer(roomId:string,playerId:string){
        if(this.waiting.has(roomId)){
            this.waiting.get(roomId)?.push(playerId);
        }
        else{
            this.waiting.set(roomId,[playerId]);
        }
        return this.waiting.get(roomId)?.length;
    }
    removeWaiting(roomId:string){
        this.waiting.delete(roomId);
    }
    getPlayer(roomId:string){
        return this.waiting.get(roomId);
    }
}
const waitingRoomService=new WaitingRoomService();
export default waitingRoomService;