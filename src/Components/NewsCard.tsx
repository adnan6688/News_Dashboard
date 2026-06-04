import type { UseQueryResult } from "@tanstack/react-query";
import type { NewsItem } from "../api/newsapi"
import axiosInstance from "../BaseUrl/baseurl"
import Toast from "../Toast/Toast"

type Props = {
    data: NewsItem[];
    refetch: UseQueryResult["refetch"];
};

export default function NewsCard({ data, refetch }: Props) {

    const handleToggleBreaking = async (newsId: number) => {
        try {

            const result = await axiosInstance.patch(`/news/latest-news-add-from-news?newsId=${newsId}`)

            if (result?.data) {
                refetch()
                Toast({ type: 'success', message: result?.data?.message })
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.map((item: NewsItem) => (
                <div
                    key={item._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-100 relative"
                >
                    {/* Toggle Button */}
                

                    {/* Image */}
                    <div className="relative h-40 w-full overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />

                        {/* CTR Badge */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            CTR {item.ctr}%
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                        <span className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-full">
                            {item.category?.[0]}
                        </span>

                        <h2 className="font-semibold text-gray-800 line-clamp-2 text-sm group-hover:text-red-600 transition">
                            {item.title}
                        </h2>

                        <div className="flex items-center justify-between text-[14px] text-gray-500">
                            <span>Impressions: {item.impressions || 0}</span>
                            <span>Clicks: {item.clicks}</span>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                            <img
                                src={item.author?.image}
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-gray-600 truncate">
                                {item.author?.name}
                            </span>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Read Article
                            </a>

                            <button
                                onClick={() => handleToggleBreaking(item?.id)}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${item?.isBreaking
                                    ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                                    : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                                    }`}
                            >
                                <span className="text-base">
                                    {item?.isBreaking ? "⭐" : "✨"}
                                </span>

                                {item?.isBreaking ? "Featured" : "Make Featured"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
