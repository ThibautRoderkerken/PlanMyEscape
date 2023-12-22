import { IUser } from "src/app/user/models/user";

export interface IHoliday {
  id: number;
  name: string;
  city: string;
  address: string;
  country: string;
  owner?: IUser;
  startAt?: Date;
  endAt?: Date;
  isPublished: boolean;
  activities: IActivity[];
  users: IUser[];
}

export interface IActivity {
  id: number;
  name: string;
  description: string;
  destination: string;
  startAt?: Date;
  endAt: Date;
}

export class Holiday implements IHoliday {
  id: number;
  name: string;
  city: string;
  address: string;
  country: string;  owner?: IUser | undefined;
  startAt?: Date = new Date();
  endAt?: Date = new Date();
  isPublished: boolean = false;
  activities: IActivity[] = [];
  users: IUser[] = [];
}

export class Activity implements IActivity {
  id: number;
  name: string;
  description: string;
  destination: string;
  startAt?: Date | undefined;
  endAt: Date;
}
