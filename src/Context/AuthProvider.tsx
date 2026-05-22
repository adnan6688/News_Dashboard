import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../BaseUrl/baseurl";
import type { IValue } from "./userType";
import { AuthContext } from "./AuthContext";



interface Props {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {


    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, isLoading, refetch, } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const res = await axiosInstance.get("user/getMe");
            console.log(res, "response")
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 min cache
        retry: false,
    });

    const user = data ? data : null;

    const value: IValue = {
        user,
        loading: isLoading,
        refetchUser: refetch,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;