import { User } from "./user";

export interface Message {
  id: number;
  body: string;
  user: User;
}
