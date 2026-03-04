class GameService {
  player1: string;
  player2: string;
  roomId: string;
  gameState: string[][];
  turn: string;
  player1Symbol: "X" | "O";
  player2Symbol: "X" | "O";
  player1points:number;
  player2points:number;
  disconnected:boolean;
  disconnectedPlayer:string[];
  constructor(player1: string, player2: string, roomId: string) {
    this.player1 = player1;
    this.player2 = player2;
    this.roomId = roomId;
    this.gameState = Array(3)
      .fill(0)
      .map(() => Array(3).fill("empty"));
    this.turn = Math.random() < 0.5 ? player1 : player2;
    this.player1Symbol = Math.random() < 0.5 ? "X" : "O";
    this.player2Symbol = this.player1Symbol === "X" ? "O" : "X";
    this.player1points=0;
    this.player2points=0;
    this.disconnected=false;
    this.disconnectedPlayer=[];
  }
  makeMove(row:number,col:number,playerId:string){
    if(this.turn!==playerId){
      return;
    }
    if(this.gameState[row][col]!="empty"){
      return;
    }
    this.gameState[row][col]=this.turn===this.player1?this.player1Symbol:this.player2Symbol;
    if(this.checkWinner(this.turn===this.player1?this.player1Symbol:this.player2Symbol)){
      if(this.turn===this.player1){
        this.player1points+=1.5;
      }
      else{
        this.player2points+=1.5;
      }
      this.gameState=Array(3).fill(0).map(()=>Array(3).fill("empty"));
    }
    else{
       if(this.checkDraw())
       {
        this.player1points+=0.5;
        this.player2points+=0.5;
        this.gameState=Array(3).fill(0).map(()=>Array(3).fill("empty"));
       }
    }
    this.turn=this.turn===this.player1?this.player2:this.player1;
  }
  private checkWinner(check:string):boolean{
      if(this.gameState[0][0]===check&&this.gameState[0][1]===check&&this.gameState[0][2]===check){
        return true;
      }
      if(this.gameState[1][0]===check&&this.gameState[1][1]===check&&this.gameState[1][2]===check){
        return true;
      }
      if(this.gameState[2][0]===check&&this.gameState[2][1]===check&&this.gameState[2][2]===check){
        return true;
      }
      if(this.gameState[0][0]===check&&this.gameState[1][0]===check&&this.gameState[2][0]===check){
        return true;
      }
      if(this.gameState[0][1]===check&&this.gameState[1][1]===check&&this.gameState[2][1]===check){
        return true;
      }
      if(this.gameState[0][2]===check&&this.gameState[1][2]===check&&this.gameState[2][2]===check){
        return true;
      }
      if(this.gameState[0][0]===check&&this.gameState[1][1]===check&&this.gameState[2][2]===check){
        return true;
      }
      if(this.gameState[0][2]===check&&this.gameState[1][1]===check&&this.gameState[2][0]===check){
        return true;
      }
      return false;
  }
  private checkDraw():boolean{
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(this.gameState[i][j]==="empty"){
          return false;
        }
      }
    }
    return true;
  }
}

export default GameService;
