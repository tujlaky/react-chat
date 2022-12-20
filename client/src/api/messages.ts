import axios from "axios";
import { Message } from "../../../interfaces/message";

export async function getMessages() {
  const messages = await axios.get<Message[]>("http://localhost:3001/message", {
    method: "GET",
  });

  return messages;
}
