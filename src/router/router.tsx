import { createBrowserRouter } from "react-router";
import Login from "../Components/Login";
import DashboardLayout from "../pages/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import Users from "../pages/Users";
import PrivetRoutes from "./PrivetRoutes";
import Videos from "../pages/Videos";
import BannarsPage from "../pages/BannarsPage";
import Newspage from "../pages/Newspage";
import Settings from "../pages/Settings";



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
            }, {
                path: 'videos',
                element: <Videos></Videos>
            }, {
                path: "bannars",
                element: <BannarsPage></BannarsPage>
            }, {
                path: 'news',
                element: <Newspage></Newspage>
            }, 
            {
                path  : 'settings',
                element : <Settings></Settings>
            }
        ]
    }
])