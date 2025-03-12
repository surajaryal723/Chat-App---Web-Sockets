"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let sockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        let parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            if (parsedMessage.payload.roomId) {
                sockets.push({
                    socket,
                    room: parsedMessage.payload.roomId,
                });
            }
            else {
                socket.send('Missing room Id');
            }
        }
        else if (parsedMessage.type === "chat") {
            // @ts-ignore
            let room = sockets.find((s) => s.socket === socket);
            if (room) {
                let socketsInRoom = sockets.filter((s) => (s.room === room.room));
                socketsInRoom.forEach((s) => {
                    s.socket.send(parsedMessage.payload.message);
                });
            }
            else {
                socket.send("You have not joined any room yet");
            }
        }
    });
    socket.on('close', (socket) => {
        // @ts-ignore
        sockets = sockets.filter(s => s.socket !== socket);
    });
});
