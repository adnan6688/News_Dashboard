import { useQuery } from "@tanstack/react-query";
import { breakingNewsApi } from "../api/newsapi";
import axiosInstance from "../BaseUrl/baseurl";
import Toast from "../Toast/Toast";


type NewsItem = {
    _id: string;
    title: string;
    image: string;
    date: string;
    isBreaking: boolean;
    newsId: number
};


function timeAgo(date: string | Date) {
    const now = new Date().getTime();
    const past = new Date(date).getTime();

    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
}



export default function Breakingnews() {

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["news"],
        queryFn: breakingNewsApi,
    });

    const newsList: NewsItem[] = data?.news || [];


    const handleToggleBreaking = async (newsId: number) => {
        try {

            const result = await axiosInstance.patch(`/news/change-news-status?newsId=${newsId}`)

            if (result?.data) {
                refetch()
                Toast({ type: 'success', message: result?.data?.message })
            }
        } catch (err) {
            console.log(err)
        }
    }

    console.log(newsList)


    if (isLoading) return <div className="p-4 text-gray-500 font-medium">Loading featured news...</div>;
    if (isError) return <div className="p-4 text-red-500">Error loading news</div>;


    return (
        <div className="w-full overflow-hidden relative py-5 bg-transparent group">

            {/* fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <style>{`
    @keyframes marquee {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }

    .marquee {
      animation: marquee 20s linear infinite;
      will-change: transform;
    }

    .group:hover .marquee {
      animation-play-state: paused;
    }
  `}</style>

            <div className="flex gap-5 w-max marquee">

                {newsList?.map((news, index) => (
                    <div
                        key={news._id || index}
                        className="relative flex items-center w-90 h-24 shrink-0 rounded-2xl
        bg-white/70 backdrop-blur-xl border border-white/40
        shadow-md hover:shadow-xl hover:scale-[1.03]
        transition-all duration-300 overflow-hidden"
                    >

                        {/* breaking toggle */}
                        <button
                            onClick={() => handleToggleBreaking(news?.newsId)}
                            className={`absolute top-2 right-2 w-11 h-6 flex items-center rounded-full p-1 transition
          ${news?.isBreaking ? "bg-emerald-500" : "bg-gray-300"}`}
                        >
                            <div
                                className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transition-transform duration-300
            ${news?.isBreaking ? "translate-x-5" : "translate-x-0"}`}
                            />
                        </button>

                        {/* image */}
                        <div className="w-28 h-full shrink-0 overflow-hidden">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                        "https://placehold.co/120x100?text=News";
                                }}
                            />
                        </div>

                        {/* content */}
                        <div className="p-3 flex flex-col justify-between h-full min-w-0">
                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                                {news.title}
                            </h3>

                            <div className="flex items-center justify-between">
                                <span className="text-[11px] text-gray-400">
                                    {news.date ? timeAgo(news.date) : "just now"}
                                </span>

                                {news.isBreaking && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-500 font-medium">
                                        LIVE
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}