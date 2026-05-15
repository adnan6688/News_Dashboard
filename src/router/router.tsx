import { createBrowserRouter } from "react-router";
import Login from "../Components/Login";
import DashboardLayout from "../pages/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    }, {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome></DashboardHome>
            }
        ]
    }
])