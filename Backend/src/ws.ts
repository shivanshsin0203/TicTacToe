import { Server, Socket } from "socket.io";
import { get, Server as HttpServer } from "http";

export const initWs = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("Player connected:", socket.id);
    });
};
