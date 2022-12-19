import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  socket.emit("hi");
  console.log("a user connected");
});

io.listen(3000);
