import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  roomId: string;
}

let sockets: User[] = [];

wss.on("connection", (socket) => {
  console.log(sockets);

  socket.on("message", (message) => {
    let parsedBody = JSON.parse(message as unknown as string);
    if (parsedBody.type === "join") {
      sockets.push({
        socket,
        roomId: parsedBody.payload.roomId,
      });
    }
  else if(parsedBody.type==='chat'){
    let messageReceivers=sockets.filter(x=>x.roomId===parsedBody.payload.roomId)
   messageReceivers.forEach(receiver=>{
    receiver.socket.send(parsedBody.payload.message.toString())
   })
  }
  });
  socket.on("close", (socket) => {
    // @ts-ignore
    sockets = sockets.filter((s) => s !== socket);
  });
});
