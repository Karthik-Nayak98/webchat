const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const router = require("./router");
const {
  addUser,
  getUser,
  removeUser,
  getUserInRoom,
  getAdmins,
  getUsers,
  getRooms,
  createRoom,
  deleteRoom,
} = require("./user");

const PORT = process.env.PORT || 4000;
const app = express();

// creates a server.
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(router);

// Instantiates a socket server.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Opens a web socket connection.
// A user can connect to it.
io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const roomError = createRoom({ room, name, id: socket.id });
    const { error, user } = addUser({ id: socket.id, name, room });

    const users = getUserInRoom(room);
    const admins = getAdmins(room);
    const rooms = getRooms();

    if (error) return callback(error);

    // Join a particular room
    socket.join(user.room);

    io.emit("rooms", rooms);
    io.to(room).emit("admins", admins);

    // Welcome message sent to only joined user.
    socket.emit("message", {
      text: `${user.name}, Welcome to the channel ${user.room}`,
    });

    // Broadcast the message to everyone except the client who has joined in the room.
    socket.broadcast
      .to(user.room)
      .emit("message", { text: `${name} has joined the channel` });

    // Update users in current room
    io.to(user.room).emit("users", users);

    // Callback if there is no error
    return callback();
  });

  socket.on("delete", ({ deleteroom }, callback) => {
    io.to(deleteroom).emit("deleteuser", {});
    deleteRoom(deleteroom);
  });

  socket.on("sendMessage", ({ message, id }, callback) => {
    const user = getUser(id);

    // Responding to the events for the users who are listening.
    // This notifies all the users including the current client
    io.to(user.room).emit("message", {
      name: user.name,
      text: message,
      id: user.id,
    });
    // Callback if there is no error

    callback();
  });

  // Emiting socket event for getting users in room
  socket.on("users", ({ room }) => {
    const users = getUserInRoom(room);
    io.to(room).emit("users", users);
  });

  // Listen to the disconnect event
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    const users = getUserInRoom(user?.room);
    io.to(user?.room).emit("message", {
      text: `${user?.name} has left the channel`,
    });
    // Notify users while disconnecting
    io.to(user?.room).emit("users", users);
  });
});

server.listen(PORT, console.log(`Listening at port ${PORT}...`));
