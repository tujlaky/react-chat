import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import { Message } from "../../interfaces/message";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

app.use(cors());

const state: {
  lastId: number;
  messages: Message[];
} = {
  lastId: 0,
  messages: [],
};

app.get("/", (_, res) => {
  return res.send("Working");
});

app.get("/message", (_, res) => {
  return res.json(state.messages);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (messageBody: string) => {
    state.lastId++;
    const message = {
      id: state.lastId,
      body: messageBody,
      user: {
        name: "Demo",
        color: "#FF0000",
      },
    };
    state.messages = [...state.messages, message];

    socket.emit("new-message", message);
  });
});

httpServer.listen(3001, "127.0.0.1", () => {
  console.log("listen on 127.0.0.1:3001");
});
