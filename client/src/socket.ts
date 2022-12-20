import { io } from "socket.io-client";

const URL = "http://localhost:3001";

export const socket = io(URL);

export function sendMessage(message: string) {
  socket.emit("message", message);
}

export default socket;
