import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import logo from './../assets/WhatsApp_Image_2026-05-12_at_9.52.35_AM__1_-removebg-preview.png'

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    const menu = [
        { name: "Home", path: "/dashboard" },
        { name: "Users", path: "/dashboard/users" },
        { name: "Settings", path: "/settings" },
    ];
    const useLocaion = useLocation()

  

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
                                `block px-4 py-2 rounded-lg transition-colors duration-200 ${useLocaion.pathname == item.path ? "bg-black text-white" : "hover:bg-gray-200"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
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
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 h-screen overflow-hidden">

                {/* Topbar */}
                <header className="h-14 bg-white shadow flex items-center px-4 md:px-6 shrink-0 z-10">
                    <button
                        className="md:hidden mr-3 text-xl p-2 hover:bg-gray-100 rounded transition-colors"
                        onClick={() => setOpen(true)}
                    >
                        ☰
                    </button>

                    <h1 className="font-semibold">Dashboard</h1>
                </header>

                {/* Scrollable Content Body */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 raw-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}