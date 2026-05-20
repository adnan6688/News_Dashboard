import type { NewsItem } from "../api/newsapi"

type Props = {
    data: NewsItem[]
}

export default function NewsCard({ data }: Props) {


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.map((item: NewsItem) => (
                <div
                    key={item._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-100"
                >
                    {/* Image */}
                    <div className="relative h-40 w-full overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />

                        {/* CTR Badge Top */}
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            CTR {item.ctr}%
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                        {/* Category */}
                        <span className="text-[10px]  bg-red-50 text-red-600 px-2 py-1 rounded-full">
                            {item.category?.[0]}
                        </span>

                        {/* Title */}
                        <h2 className="font-semibold text-gray-800 line-clamp-2 text-sm group-hover:text-red-600 transition">
                            {item.title}
                        </h2>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-[14px] text-gray-500">
                            <span>Impressions: {item.impressions || 0}</span>
                            <span>Clicks: {item.clicks}</span>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                            <img
                                src={item.author?.image}
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-gray-600 truncate">
                                {item.author?.name}
                            </span>
                        </div>

                        {/* Button */}
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
