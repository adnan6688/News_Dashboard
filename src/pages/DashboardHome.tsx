import { useQuery } from "@tanstack/react-query";
import { recentFiveUsersapi, userAnalyticsApi, userInfoCoutnapi } from "../api/newsapi";
import {
    Newspaper,
    Users,
    ShieldCheck,
    UserRound,
    Flame,
} from "lucide-react";
import StatsCard from "../Components/StatsCard";
import UserBarChart from "../Components/UserBarChart";
import { useState } from "react";
import Recent from "../Components/Recent";
import Breakingnews from "./Breakingnews";



export default function DashboardHome() {

    const [yearInfo, setYearInfo] = useState<number>(new Date().getFullYear())

    const { data: userCount } = useQuery({
        queryKey: ['count'],
        queryFn: userInfoCoutnapi
    })


    const { data: userAnaylictsData, isLoading: analyticsLoading } = useQuery({
        queryKey: ['analytics', yearInfo],
        queryFn: () => userAnalyticsApi(yearInfo)
    })

    const { data: recenUsers } = useQuery({
        queryKey: ['recentUsers'],
        queryFn: recentFiveUsersapi
    })



    console.log(recenUsers?.data, "recent users result")




    return (
        <div className="">

            <div className="flex items-center gap-2.5 px-4 pt-4 pb-2">

                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>


                <h1 className="text-xl font-extrabold text-slate-800 tracking-tight sm:text-2xl">
                    Breaking <span className="text-red-500">News</span>
                </h1>
            </div>
            <Breakingnews />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-2 xl:grid-cols-5 gap-6">

                <StatsCard
                    title="Total News"
                    count={userCount?.data?.totalNews || 0}
                    icon={Newspaper}
                    iconColor="text-blue-600"
                    bgColor="from-blue-50"
                />

                <StatsCard
                    title="Guest Users"
                    count={userCount?.data?.GUESTUser || 0}
                    icon={UserRound}
                    iconColor="text-orange-600"
                    bgColor="from-orange-50"
                />

                <StatsCard
                    title="Authenticated"
                    count={userCount?.data?.authencticateUser || 0}
                    icon={ShieldCheck}
                    iconColor="text-emerald-600"
                    bgColor="from-emerald-50"
                />

                <StatsCard
                    title="Total Users"
                    count={userCount?.data?.totalUser || 0}
                    icon={Users}
                    iconColor="text-purple-600"
                    bgColor="from-purple-50"
                />

                <StatsCard
                    title="Today Breaking News"
                    count={userCount?.data?.todayBreakingNews || 0}
                    icon={Flame}
                    iconColor="text-red-500"
                    bgColor="from-red-50"
                />

            </div>


            <div className="flex flex-col lg:flex-row gap-6 my-6">
                {/* Chart Section */}
                <div className="w-full lg:w-3/5  rounded-xl">
                    {analyticsLoading ? (
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            Loading analytics...
                        </div>
                    ) : (
                        <UserBarChart
                            yearInfo={yearInfo}
                            setYearInfo={setYearInfo}
                            data={userAnaylictsData?.data || []}
                        />
                    )}
                </div>

                {/* Recent Users Section */}
                <div className="w-full lg:w-2/5  rounded-xl  ">
                    <Recent users={recenUsers?.data} />
                </div>
            </div>

        </div>
    );
}