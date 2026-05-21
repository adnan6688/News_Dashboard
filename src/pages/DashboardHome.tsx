import { useQuery } from "@tanstack/react-query";
import { ctrApi, recentAddedvideoapi, recentBannarApi, recentFiveUsersapi, topusersapi, userAnalyticsApi, userInfoCoutnapi } from "../api/newsapi";
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
import VideosCard from "../Components/VideosCard";
import Bannars from "../Components/Bannars";
import CtrAnalyticsList from "../Components/CtrAnalyticsList";
import TopUsers from "../Components/TopUsers";
import { Link } from "react-router";



export default function DashboardHome() {
   
    const [yearInfo, setYearInfo] = useState<number>(new Date().getFullYear())

    const { data: userCount } = useQuery({
        queryKey: ['count'],
        queryFn: userInfoCoutnapi,
        retry: false,
        refetchOnWindowFocus: false,
    })


    const { data: userAnaylictsData, isLoading: analyticsLoading } = useQuery({
        queryKey: ['analytics', yearInfo],
        queryFn: () => userAnalyticsApi(yearInfo),
        retry: false,
        refetchOnWindowFocus: false,
    })

    const { data: recenUsers } = useQuery({
        queryKey: ['recentUsers'],
        queryFn: recentFiveUsersapi, retry: false,
        refetchOnWindowFocus: false,
    })


    const { data: recentVideoData, isLoading: VideoLoading } = useQuery({
        queryKey: ['recentVideo'],
        queryFn: recentAddedvideoapi, retry: false,
        refetchOnWindowFocus: false,
    })


    const { data: bannarsData, isLoading: BannarLoading  } = useQuery({
        queryKey: ['recentBannar'],
        queryFn: recentBannarApi, retry: false,
        refetchOnWindowFocus: false,
    })

    
    const { data: ctrData, isLoading: ctrLoading } = useQuery({
        queryKey: ['ctr'],
        queryFn: () => ctrApi(5),
        retry: false,
        refetchOnWindowFocus: false,
    })
    const { data: topusersData, isLoading: topusersLoading } = useQuery({
        queryKey: ['topusers-info'],
        queryFn: topusersapi,
        retry: false,
        refetchOnWindowFocus: false,
    })
    console.log(ctrLoading)





    return (
        <div className="">

            <div className="flex items-center gap-2.5 px-4  pb-2">

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
                    title="Authenticated Users"
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

            <div className="my-4">
                <div className="flex flex-col sm:flex-row gap-4">

                    {/* Box 1 */}
                    <div className="w-full sm:w-1/2 bg-white rounded-xl ">

                        {!topusersLoading && topusersData?.length > 0 ? (
                            <TopUsers data={topusersData || []} />
                        ) : (
                            <p className="text-gray-400 text-sm">Loading top users...</p>
                        )}
                    </div>

                    {/* Box 2 */}
                    <div className="w-full sm:w-1/2 bg-sky-50 shadow p-3 rounded-xl ">
                        <CtrAnalyticsList data={ctrData?.data || []} />
                    </div>

                </div>
            </div>


            <div className=" bg-transparent my-5">

                <div className="flex items-center justify-between gap-4 mb-4">

                    <div className="flex items-center gap-2.5">
                        {/* ভিডিও আইকন */}
                        <div className="p-2 bg-red-50 text-red-500 rounded-xl border border-red-100 shrink-0">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                                Recently Added Videos
                            </h2>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">
                                Latest video content uploaded to the portal.
                            </p>
                        </div>
                    </div>


                    <Link to={'/dashboard/videos'}>
                        <button

                            className="relative flex items-center gap-1.5 py-1 text-sm text-red-500 uppercase cursor-pointer shrink-0 group transition-all duration-300"
                        >

                            <span>View All</span>


                            <div className="relative w-4 h-4 overflow-hidden">
                                <svg
                                    className="w-4 h-4 absolute inset-0 transform -translate-x-1 opacity-70 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-300 ease-out"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>


                            <span className="absolute bottom-0 left-1/2 w-0  h-0.5  bg-red-500 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
                        </button></Link>

                </div>

                <div>
                    {VideoLoading ? (
                        <div className="flex items-center gap-3 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-500 font-medium">
                            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading videos...</span>
                        </div>
                    ) : recentVideoData?.data?.length > 0 ? (
                        <VideosCard videos={recentVideoData?.data} type="Dashboard" />
                    ) : (
                        <div className="flex flex-col items-center justify-center p-10 text-slate-700">
                            <p className="text-lg ">No videos found 😕</p>
                            <span className="text-sm mt-1">Try adding some videos first</span>
                        </div>
                    )}
                </div>
            </div>


            <div className="my-4">
                <Bannars  banners={bannarsData?.data} isLoading={BannarLoading} />
            </div>

        </div>
    );
}