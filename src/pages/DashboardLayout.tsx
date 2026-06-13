/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import logo from './../assets/WhatsApp_Image_2026-05-12_at_9.52.35_AM__1_-removebg-preview.png'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUserapi } from "../api/newsapi";
import Toast from "../Toast/Toast";

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    // const { setAuthUser } = useAuth()

    const menu = [
        { name: "Home", path: "/dashboard" },
        { name: "Users", path: "/dashboard/users" },
        { name: "Videos", path: "/dashboard/videos" },
        { name: "Bannar", path: "/dashboard/bannars" },
        { name: "News", path: "/dashboard/news" },
        { name: "Notifications", path: '/dashboard/notifications' },
        { name: "Settings", path: "/dashboard/settings" },
        { name: "Featured News", path: "/dashboard/featured" },
        { name: "Birthday", path: "/dashboard/birthday" },

    ];
    const useLocaion = useLocation()


    const { mutate, isPending } = useMutation({
        mutationFn: logoutUserapi,

        onSuccess: async (data) => {
            if (data.success) {
                queryClient.setQueryData(["currentUser"], null);
                queryClient.removeQueries({ queryKey: ["currentUser"] });


                Toast({ type: 'success', message: data?.message || "Logged out successfully" });
                navigate("/", { replace: true });
            }
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            
            Toast({ type: 'error', message: error?.message || "Something went wrong" });
        },
    });



    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100">

            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex md:w-64 h-screen bg-sky-50 shadow-lg flex-col shrink-0">
                <div className="p-4 text-xl ">
                    <img src={logo} alt="" />

                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={() =>
                                `block px-4 py-2 rounded-lg transition-colors duration-200 ${useLocaion.pathname == item.path ? "bg-sky-950 text-white" : "hover:bg-gray-200"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>


                <button
                    onClick={() => mutate()}
                    disabled={isPending}
                    className={`px-6 py-2 m-4 cursor-pointer font-medium rounded-full text-white transition-all duration-300 shadow-md
  bg-linear-to-r from-red-700 via-red-800 to-red-900
  hover:from-red-600 hover:to-red-700 hover:shadow-lg
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isPending ? "Logging out..." : "Logout"}
                </button>
            </aside>

            {/* Mobile Sidebar (Always rendered for smooth transition) */}
            <div
                className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${open ? "visible pointer-events-auto" : "invisible pointer-events-none"
                    }`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setOpen(false)}
                />

                {/* Sidebar Panel */}
                <div
                    className={`absolute left-0 top-0 w-64 h-screen bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out flex flex-col ${open ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <img src={logo} alt="" />
                        </div>
                        <button
                            className="text-xl p-1 hover:bg-gray-100 rounded"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex-1 space-y-2 overflow-y-auto">
                        {menu.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? "bg-black text-white" : "hover:bg-gray-200"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        onClick={() => mutate()}
                        disabled={isPending}
                        className={`px-6 py-2 m-4 cursor-pointer font-medium rounded-full text-white transition-all duration-300 shadow-md
  bg-linear-to-r from-red-700 via-red-800 to-red-900
  hover:from-red-600 hover:to-red-700 hover:shadow-lg
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isPending ? "Logging out..." : "Logout"}
                    </button>
                </div>


            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 h-screen overflow-hidden">

                {/* Topbar */}
                <header className="w-full bg-white border-b border-slate-100 flex items-center px-4 md:px-8 py-4 shrink-0 z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">


                        <div className="flex items-start gap-1 sm:gap-0">

                            <button
                                className="md:hidden mr-3 text-2xl p-1.5 text-slate-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-colors mt-1"
                                onClick={() => setOpen(true)}
                            >
                                ☰
                            </button>

                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                                    Welcome back, Admin <span className="animate-bounce"></span>
                                </h1>
                                <p className="text-xs md:text-sm text-slate-400 font-medium mt-0.5">
                                    Here's what's happening with your news portal today.
                                </p>
                            </div>
                        </div>

                        <div className="self-start sm:self-center flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 text-slate-600 text-xs md:text-sm font-semibold shadow-sm">
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-slate-700">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>

                    </div>
                </header>

                {/* Scrollable Content Body */}
                <main className="flex-1 overflow-y-auto p-2 md:p-5 bg-gray-50 raw-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}