import { Server } from "socket.io";
import { SocketIOService } from "./service";
import { SOCKET_EVENTS } from "../consts";

export default (expressServer) => {
  SocketIOService.instance().initialize(expressServer, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    },
  });

  const io = SocketIOService.instance().getServer();


  const userSocketMap = {}; // Этот объект будет хранить пользователей и их сокеты

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    userSocketMap[userId] = socket.id; // Сохраняем пользователя

    socket.on(SOCKET_EVENTS.JOIN_CHAT, ({ chatId }) => {
      socket.join(chatId);
      const room = io.sockets.adapter.rooms.get(chatId) as Set<string>;
      if (room && room.size > 1) {
        socket.to(chatId).emit(SOCKET_EVENTS.PARTNER_JOINED);
      }
    });

    socket.on(SOCKET_EVENTS.LEAVE_CHAT, ({ chatId }) => {
      socket.leave(chatId);
      const room = io.sockets.adapter.rooms.get(chatId);
      if (room && room.size <= 1) {
        socket.to(chatId).emit(SOCKET_EVENTS.PARTNER_LEFT);
      }
    });

    socket.on(SOCKET_EVENTS.TYPING, ({ chatId }) => {
      socket.to(chatId).emit(SOCKET_EVENTS.TYPING);
    });

    socket.on(SOCKET_EVENTS.JOIN_CHATS_LIST, ({ userId }) => {
      const room = `${userId}_chats`;
      socket.join(room);
    });

    socket.on(SOCKET_EVENTS.LEAVE_CHATS_LIST, ({ userId }) => {
      const room = `${userId}_chats`;
      socket.leave(room);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    io.of("/").adapter.on("join-room", (room, id) => {
      console.log(`socket ${id} has joined room ${room}`);
    });

    io.of("/").adapter.on("leave-room", (room, id) => {
      socket.to(room).emit(SOCKET_EVENTS.PARTNER_LEFT);
    });
  });


  return io;
};
