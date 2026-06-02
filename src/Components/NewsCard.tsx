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
                    <button
                        type="button"
                        className={`absolute cursor-pointer top-2 right-2 w-10 h-5 flex items-center rounded-full p-1 transition z-50 ${item?.isBreaking ? "bg-green-500" : "bg-gray-300"
                            }`}
                        onClick={() => handleToggleBreaking(item?.id)}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${item?.isBreaking ? "translate-x-5" : "translate-x-0"
                                }`}
                        />
                    </button>

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

                        <a
                            href={item.link}
                            target="_blank"
                            className="block mt-3 text-center bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-2 rounded-xl text-sm transition shadow-sm"
                        >
                            Read Article
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}
