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

    const { data, isLoading, isError , refetch } = useQuery({
        queryKey: ["news"],
        queryFn: breakingNewsApi,
    });

    const newsList: NewsItem[] = data?.news || [];


    const handleToggleBreaking = async (newsId: string) => {
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


    if (isLoading) return <div className="p-4 text-gray-500 font-medium">Loading featured news...</div>;
    if (isError) return <div className="p-4 text-red-500">Error loading news</div>;


    return (
        <div className="w-full overflow-hidden whitespace-nowrap bg-transparent py-4 relative group">

            <style>{`
    @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
    }

    .animate-custom-marquee {
        animation: marquee 100s linear infinite;
    }

    .animate-custom-marquee:hover {
        animation-play-state: paused;
    }
`}</style>

            <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />


            <div className="flex gap-4 w-max animate-custom-marquee group-hover:[animation-play-state:paused]">


                {newsList?.map((news, index) => (
                    <div
                        key={`orig-${news._id || index}`}
                        className="relative flex items-center w-95 h-23 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden shrink-0"
                    >
                        {/* Toggle Button (Top Right) */}
                        <button
                            onClick={() => handleToggleBreaking(news._id)}
                            className={`absolute cursor-pointer top-2 right-2 w-10 h-5 flex items-center rounded-full p-1 transition ${news?.isBreaking ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${news?.isBreaking ? "translate-x-5" : "translate-x-0"
                                    }`}
                            />
                        </button>

                        <div className="w-30 h-full shrink-0">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "https://placehold.co/120x100?text=News";
                                }}
                            />
                        </div>

                        <div className="p-3 flex flex-col justify-between h-full grow min-w-0 text-left whitespace-normal">
                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                                {news.title}
                            </h3>
                            <span className="text-[11px] text-gray-400">
                                {news.date ? timeAgo(news.date) : "just now"}
                            </span>
                        </div>
                    </div>
                ))}


                {newsList?.map((news, index) => (
                    <div
                        key={`dup-${news._id || index}`}
                        className="flex items-center w-95 h-24 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden shrink-0"
                    >
                        <div className="w-30 h-full shrink-0">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/120x100?text=News';
                                }}
                            />
                        </div>
                        <div className="p-3 flex flex-col justify-between h-full grow min-w-0 text-left whitespace-normal">
                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                                {news.title}
                            </h3>
                            <span className="text-[11px] text-gray-400">
                                {news.date ? timeAgo(news.date) : "just now"}
                            </span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}