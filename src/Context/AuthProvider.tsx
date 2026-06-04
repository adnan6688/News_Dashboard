/* eslint-disable react-hooks/set-state-in-effect */

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../BaseUrl/baseurl";
// import type { IValue } from "./userType";
// import { AuthContext } from "./AuthContext";



// interface Props {
//     children: React.ReactNode;
// }

// type LoginUserType = {
//     _id: string;
//     name: string;
//     email: string;
//     role: "ADMIN" | "USER" | string;

//     image: string | null;
//     birth_date: string;

//     deviceId: string | null;
//     fcmToken: string | null;

//     admob: boolean;

//     breakingNewsNotification: boolean;
//     birthDayNotification: boolean;

//     isDelete: boolean;

//     lastActiveAt: string;
//     createdAt: string;
//     updatedAt: string;
// };

// const AuthProvider = ({ children }: Props) => {


//     const [authUser, setAuthUser] = useState<LoginUserType | null>(null)


//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { data, isLoading, refetch, } = useQuery({
//         queryKey: ["currentUser"],
//         queryFn: async () => {
//             const res = await axiosInstance.get("user/getMe");


//             setAuthUser(res?.data?.data)
//             console.log(authUser, res?.data?.data)
//             return res.data.data;
//         },
//         staleTime: 1000 * 60 * 5, // 5 min cache
//         retry: false,
//     });

//     const user = data ? data : null;

//     const value: IValue = {
//         user,
//         loading: isLoading,
//         refetchUser: refetch,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../BaseUrl/baseurl";
import type { IValue } from "./userType";
import { AuthContext } from "./AuthContext";

interface Props {
    children: React.ReactNode;
}

export type LoginUserType = {
    _id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER" | "GUEST";

    image: string | File;
    birth_date: string;

    deviceId: string | null;
    fcmToken: string | null;

    admob: boolean;

    breakingNewsNotification: boolean;
    birthDayNotification: boolean;

    isDelete: boolean;

    lastActiveAt: string;
    createdAt: string;
    updatedAt: string;
};

const AuthProvider = ({ children }: Props) => {
    const [authUser, setAuthUser] = useState<LoginUserType | null>(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const res = await axiosInstance.get("user/getMe");
            return res.data.data;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

 
    useEffect(() => {
        if (data) {
            setAuthUser(data);
        } else {
            setAuthUser(null);
        }
    }, [data]);

    const value: IValue = {
        user: authUser, 
        loading: isLoading,
        refetchUser: refetch,
        setAuthUser
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
