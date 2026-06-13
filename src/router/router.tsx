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
import ForgetPassword from "../Components/ForgetPassword";
import OtpPage from "../Components/OtpPage";
import ResetPassword from "../Components/Resetpassword";
import Notifications from "../pages/Notifications";
import Not_Found from "../Components/Not_Found";
import AuthPrivetRoute from "./AuthPrivetRoute";
import Featured from "../pages/Featured";
import BirthDay from "../pages/BirthDay";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPrivetRoute>
            <Login></Login>
        </AuthPrivetRoute>
    }, {
        path: '/forget-password',
        element: <AuthPrivetRoute>
            <ForgetPassword />
        </AuthPrivetRoute>
    }, {
        path: '/otp-page/:email',
        element: <AuthPrivetRoute>
            <OtpPage />
        </AuthPrivetRoute>
    }, {
        path: '/reset-password/:email',
        element: <AuthPrivetRoute>
            <ResetPassword />
        </AuthPrivetRoute>
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
                path: 'settings',
                element: <Settings></Settings>
            }, {
                path: 'notifications',
                element: <Notifications></Notifications>
            }, {
                path : 'featured',
                element : <Featured></Featured>
            },
            {
                path : 'birthday',
                element : <BirthDay></BirthDay>
            }
        ]
    },
    {
        path: '/*',
        element: <Not_Found></Not_Found>
    }
])