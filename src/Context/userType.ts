

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
  refetchUser: () => Promise<void>;
  setUser: (user: IUser | null) => void;
}