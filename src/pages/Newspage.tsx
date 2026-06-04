import { useQuery } from "@tanstack/react-query"
import { getNewsApi } from "../api/newsapi"
import Loader from "../Components/Loader"
import NewsCard from "../Components/NewsCard"
import Pagination from "../Components/Pagination"
import { useEffect, useState } from "react"
import { useDebounce } from "../Utils/debounce"



export default function Newspage() {

    const [currentpage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState("");
    const [isBreaking, setIsBreaking] = useState<boolean | null>(null)

    const debouncedSearch = useDebounce(search, 1000);
    // const [isFeatured, setIsFeatured] = useState<string>('')

    const { data: newsData, isLoading, refetch } = useQuery({
        queryKey: ['get-news', currentpage, debouncedSearch, isBreaking],
        queryFn: () => getNewsApi(20, currentpage, debouncedSearch, isBreaking),
        retry: false,
        refetchOnWindowFocus: false,
    })


    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    const onPrev = () => {
        setCurrentPage(currentpage - 1)
    }

    const onNext = () => {
        setCurrentPage(currentpage + 1)
    }


    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                {/* Search Box */}
                <div className="w-full md:w-[60%] bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-black/10 transition">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search news..."
                        className="w-full outline-none text-sm bg-transparent"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-2 flex-wrap bg-white border border-gray-100 rounded-2xl p-2 shadow-sm">

                    {/* All */}
                    <button onClick={() => setIsBreaking(null)} className="px-5 py-2 rounded-full text-sm font-medium bg-black text-white shadow-md transition hover:scale-[1.03] active:scale-95">
                        All
                    </button>



                    {/* Featured */}
                    <button
                        onClick={() => setIsBreaking(true)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
    ${isBreaking
                                ? "bg-yellow-100 text-yellow-700 shadow-sm border border-yellow-200 "
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        Featured ⭐
                    </button>

                    {/* Normal */}
                    <button
                        onClick={() => setIsBreaking(false)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
    ${isBreaking === false
                                ? "bg-blue-100 text-blue-700 shadow-sm border border-blue-200"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        Normal
                    </button>



                </div>

            </div>

            {
                isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader />
                    </div>
                ) : newsData?.data?.data?.length > 0 ? (
                    <NewsCard
                        refetch={refetch}
                        data={newsData?.data?.data ?? []}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <p className="text-lg font-medium">No news found 😕</p>
                        <span className="text-sm">Try again later or add new news</span>
                    </div>
                )
            }

            <Pagination onNext={onNext} onPrev={onPrev} currentPage={newsData?.data?.meta?.page} totalPages={newsData?.data?.meta?.totalpage}></Pagination>
        </div>
    )
}
