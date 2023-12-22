import { IHoliday } from "src/app/holiday/models/holiday";
import { IUser } from "src/app/user/models/user";

export interface IChatRoom {
  id: number;
  name: string;
  displayName: string;
  users: IUser[];
  holiday?: IHoliday;
  messages?: IChatMessage[];
}

export interface IChatMessage {
    id: number;
    owner:IUser;
    chatroom: IChatRoom;
    text: string;
  }

export class ChatRoom implements IChatRoom {
    id: number;
    name: string;
    displayName: string;
    holiday?: IHoliday | undefined;
    users: IUser[] = [];
    messages?: IChatMessage[] = [];
}

export class ChatMessage implements IChatMessage {
  id: number;
  owner:IUser;
  chatroom: IChatRoom;
  text: string;
}
