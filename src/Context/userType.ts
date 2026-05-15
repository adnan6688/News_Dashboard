
import type { QueryObserverResult } from "@tanstack/react-query";
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "GUEST";
  fcmToken: string | null;
  deviceId: string | null;

  birthDayNotification: boolean;
  breakingNewsNotification: boolean;
  isDelete: boolean;

  birth_date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}


export interface IValue {
  user: IUser | null;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetchUser: () => Promise<QueryObserverResult<any, Error>>;
}