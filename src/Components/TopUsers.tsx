import { Users } from "lucide-react";
import React from "react";

type User = {
    _id: string;
    clicks: number;
    impressions: number;
    total: number;
    userDetails: {
        _id: string;
        name: string;
        email: string;
        role: string;
        image?: string | null;
    };
};

type Props = {
    data: User[];
};

const TopUsers: React.FC<Props> = ({ data }) => {
    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Table Header Action Area */}
            <div className="flex items-center justify-between p-5 border-b border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50/60 rounded-xl border border-indigo-100/50">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm  font-semibold  text-indigo-700 ">Top Users</span>
                </div>
                <span className="text-sm text-gray-400 ">{data.length} users listed</span>
            </div>

            <table className="min-w-full text-sm text-left border-collapse">
                {/* Header */}
                <thead className="bg-gray-50/70 text-gray-500  text-[14px]  font-semibold border-b border-gray-100">
                    <tr>
                        <th className="py-3.5 px-6 font-semibold text-center w-20">Rank</th>
                        <th className="py-3.5 px-6 font-semibold">User Details</th>
                        <th className="py-3.5 px-6 font-semibold text-right">Clicks</th>
                        <th className="py-3.5 px-6 font-semibold text-right">Impressions</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Performance</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-gray-50">
                    {data.map((item, index) => {
                        const isTopThree = index < 3;
                        const rankColors = [
                            "bg-amber-50 text-amber-700 border-amber-200/60 ", // #1 Gold
                            "bg-slate-100 text-slate-700 border-slate-200 ",   // #2 Silver
                            "bg-orange-50 text-orange-700 border-orange-200/50 " // #3 Bronze
                        ];

                        return (
                            <tr
                                key={item._id}
                                className="group hover:bg-indigo-50/20 transition-all duration-200"
                            >
                                {/* Rank with Premium Badges */}
                                <td className="py-4 px-6 text-center">
                                    <span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-lg border shadow-sm ${isTopThree ? rankColors[index] : "bg-white text-gray-500 border-gray-200"
                                        }`}>
                                        {index + 1}
                                    </span>
                                </td>

                                {/* User Profile */}
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative">
                                            <img
                                                src={
                                                    item.userDetails.image ||
                                                    "https://ui-avatars.com/api/?background=EEF2FF&color=4F46E5&font-size=0.4&name=" + encodeURIComponent(item.userDetails.name)
                                                }
                                                alt={item.userDetails.name}
                                                className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-indigo-100 transition-all"
                                            />
                                            {index === 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 group-hover:text-indigo-900 transition-colors">
                                                {item.userDetails.name}
                                            </p>
                                            <p className="text-sm  text-gray-400 mt-0.5">
                                                {item.userDetails.role || "Member"}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Clicks (Right aligned for financial/metric data) */}
                                <td className="py-4 px-6 text-right  text-gray-600">
                                    {item.clicks.toLocaleString()}
                                </td>

                                {/* Impressions */}
                                <td className="py-4 px-6 text-right  text-gray-600">
                                    {item.impressions.toLocaleString()}
                                </td>

                                {/* Total Highlight */}
                                <td className="py-4 px-6 text-right pr-8">
                                    <span className="inline-block  text-gray-900 bg-gray-50 group-hover:bg-indigo-50 px-2.5 py-1 rounded-md transition-colors">
                                        {item.total}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Empty state */}
            {data.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50/50">
                    <Users className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-sm  text-gray-400">No users found at the moment</p>
                </div>
            )}
        </div>
    );
};

export default TopUsers;