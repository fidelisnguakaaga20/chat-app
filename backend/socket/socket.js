// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// export const getReceiverSocketId = (receiverId) => { 
//   return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // {userId: socketId}

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId != "undefined") userSocketMap[userId] = socket.id;

//   // io.emit() is used to send events to all the connected clients

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // socket.on() is used to listen to the events. can be used both on client and server side
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//     delete userSocketMap[userId];
  
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { app, io, server };

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

// const io = new Server(server, {
//   cors: {
//     origin: CLIENT_ORIGIN,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// const userSocketMap = {}; // { userId: socketId }
// export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId && userId !== "undefined") userSocketMap[userId] = socket.id;

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//     if (userId) delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { app, io, server };


// backend/socket/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Read origins from env (Render → Environment)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || CLIENT_ORIGIN;
// allow both local dev and vercel
const ALLOWED_ORIGINS = [CLIENT_ORIGIN, FRONTEND_ORIGIN];

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
