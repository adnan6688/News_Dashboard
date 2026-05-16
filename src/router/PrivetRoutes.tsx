import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Hook/useAuth";
import Toast from "../Toast/Toast";

type Props = {
    children: React.ReactNode;
};

export default function PrivetRoutes({ children }: Props) {
    const { loading, user } = useAuth();
    const location = useLocation();


    if (loading) {
        return <h1>Loading...</h1>;
    }


    if (!user) {
        return (
            <Navigate
                to="/"
                state={{ from: location }}
                replace
            />
        );
    }

    if (user.role !== 'ADMIN') {
        Toast({ type: 'error', message: 'You are not allowed!' })
        return <Navigate to='/'></Navigate>
    }

    return children;
}