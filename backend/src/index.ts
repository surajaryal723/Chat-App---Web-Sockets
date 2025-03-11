import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let sockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    let parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type === "join") {
      if(parsedMessage.payload.roomId){

        sockets.push({
          socket,
          room: parsedMessage.payload.roomId,
        });
      }else{
        socket.send('Missing room Id')
      }
    } else if (parsedMessage.type === "chat") {
      // @ts-ignore
      let room = sockets.find((s) => s.socket === socket);

      if (room) {
        let socketsInRoom = sockets.filter((s) => (s.room === room.room));
        socketsInRoom.forEach((s) => {
          s.socket.send(parsedMessage.payload.message);
        });
      } else {
        socket.send("You have not joined any room yet");
      }
    }
  });
  socket.on('close',(socket)=>{
    // @ts-ignore
    sockets=sockets.filter(s=>s.socket!==socket)
  })
});
