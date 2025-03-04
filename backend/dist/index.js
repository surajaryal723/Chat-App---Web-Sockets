"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let sockets = [];
wss.on('connection', (socket) => {
    sockets.push(socket);
    console.log(sockets.length);
    socket.on('message', (message) => {
        sockets.forEach(socket => {
            socket.send(message.toString());
        });
    });
    socket.on('close', (socket) => {
        // @ts-ignore
        sockets = sockets.filter(s => s !== socket);
    });
});
