import { io } from "socket.io-client";

const URL = "http://localhost:3000";

console.log("CREATE NEW SOCKET");

export const socket = io(URL, {
  transports: ["websocket"],
});

export default socket;
