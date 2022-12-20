import { Server } from "socket.io";
import { Message } from "../../interfaces/message";

const io = new Server({
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  const message: Message = {
    id: 1,
    body: "Hello world!",
    user: {
      name: "Test",
      color: "#FF0000",
    },
  };

  socket.emit("message", message);

  console.log("a user connected");
});

io.listen(3001);
