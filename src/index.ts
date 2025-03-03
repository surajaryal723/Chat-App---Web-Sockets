import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8080})

let connectedUsers=0
let sockets:WebSocket[]=[]

wss.on('connection',(socket)=>{
    sockets.push(socket)
    console.log(sockets.length);
    
  socket.on('message',(message)=>{
    sockets.forEach(socket=>{
        socket.send(message.toString())
    })
  })
    
})