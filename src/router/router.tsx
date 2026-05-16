import { createBrowserRouter } from "react-router";
import Login from "../Components/Login";
import DashboardLayout from "../pages/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import Users from "../pages/Users";
import PrivetRoutes from "./PrivetRoutes";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    }, {
        path: '/dashboard',
        element: <PrivetRoutes>
            <DashboardLayout></DashboardLayout>
        </PrivetRoutes>,
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            }, {
                path: 'users',
                element: <Users></Users>
            }
        ]
    }
])