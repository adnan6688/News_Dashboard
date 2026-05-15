

import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import type { IUser } from "./userType";
import { getErrorMessage } from "../Utils/errorMessage";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const refetchUser = useCallback(async () => {
        try {
            const res = await axios.get("/api/auth/me", {
                withCredentials: true,
            });

            setUser(res.data.user);
        } catch (err) {
            const message = getErrorMessage(err)
            console.log(message)
            setUser(null);
        }
    }, []);



    useEffect(() => {
        const initAuth = async () => {
            setLoading(true);

            await refetchUser();

            setLoading(false);
        };

        initAuth();
    }, [refetchUser]);

    return (
        <AuthContext.Provider
            value={{ user, setUser, loading, refetchUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};