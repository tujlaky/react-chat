import { useAxios } from "./useAxios";
import { Message } from "../../../interfaces/message";

export const useMessages = () =>
  useAxios<Message[]>("http://localhost:3001/message", []);
