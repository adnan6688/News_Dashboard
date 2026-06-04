import type React from "react"
import { useAuth } from "../Hook/useAuth";
import Loader from "../Components/Loader";
import { Navigate, useLocation } from "react-router";

type Props = {
    children: React.ReactNode;
}


export default function AuthPrivetRoute({ children }: Props) {
    const { user, loading  } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    const isAuthRoute =
        location.pathname === '/' ||
        location.pathname === '/forget-password' ||
        location.pathname.startsWith('/otp-page/') ||
        location.pathname.startsWith('/reset-password/');

    if (!loading && user && isAuthRoute) {
     
     
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
