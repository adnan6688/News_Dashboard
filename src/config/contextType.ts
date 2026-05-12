
// interface of user
export interface IUser {
    deviceId?: string | null;
    _id?: string;
    name?: string;
    email?: string;

    role: 'ADMIN';

    fcmToken?: string | null;

    birth_date?: Date | null;

    isAnonymous?: boolean; // key for guest tracking,

    birthDayNotification? : boolean;

    breakingNewsNotification? : boolean;
}
