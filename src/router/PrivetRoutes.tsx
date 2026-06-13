import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Hook/useAuth";
import Toast from "../Toast/Toast";
import Loader from "../Components/Loader";

type Props = {
    children: React.ReactNode;
};

export default function PrivetRoutes({ children }: Props) {
    const { loading, user } = useAuth();
    const location = useLocation();

   
    if (loading) {
   
        return <div className="flex justify-center items-center ">
            <Loader></Loader>
        </div>;
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