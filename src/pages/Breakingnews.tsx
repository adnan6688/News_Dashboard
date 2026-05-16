import { useQuery } from "@tanstack/react-query";
import { breakingNewsApi } from "../api/newsapi";


type NewsItem = {
    _id: string;
    title: string;
    image: string;
    date: string;
};

export default function Breakingnews() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news"],
        queryFn: breakingNewsApi,
    });

    const newsList: NewsItem[] = data?.news || [];

    if (isLoading) return <div className="p-4 text-gray-500 font-medium">Loading breaking news...</div>;
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
            `}</style>

            <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />


            <div className="flex gap-4 w-max animate-custom-marquee group-hover:[animation-play-state:paused]">


                {newsList?.map((news, index) => (
                    <div
                        key={`orig-${news._id || index}`}
                        className="flex items-center w-95 h-23 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden shrink-0"
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
                                {news.date ? new Date(news.date).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) : 'May 16, 2026'}
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
                                {news.date ? new Date(news.date).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) : 'May 16, 2026'}
                            </span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}