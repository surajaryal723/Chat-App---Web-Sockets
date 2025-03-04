"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let sockets = [];
wss.on("connection", (socket) => {
    console.log(sockets);
    socket.on("message", (message) => {
        let parsedBody = JSON.parse(message);
        if (parsedBody.type === "join") {
            sockets.push({
                socket,
                roomId: parsedBody.payload.roomId,
            });
        }
        else if (parsedBody.type === 'chat') {
            let messageReceivers = sockets.filter(x => x.roomId === parsedBody.payload.roomId);
            messageReceivers.forEach(receiver => {
                receiver.socket.send(parsedBody.payload.message.toString());
            });
        }
    });
    socket.on("close", (socket) => {
        // @ts-ignore
        sockets = sockets.filter((s) => s !== socket);
    });
});
