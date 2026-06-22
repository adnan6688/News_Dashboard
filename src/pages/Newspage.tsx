import { useQuery } from "@tanstack/react-query"
import { getNewsApi } from "../api/newsapi"
import Loader from "../Components/Loader"
import NewsCard from "../Components/NewsCard"
import Pagination from "../Components/Pagination"
import { useEffect, useState } from "react"
import { useDebounce } from "../Utils/debounce"
import downloadNewsExcel from "../Utils/excelData"



export default function Newspage() {

    const [currentpage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState("");
    const [isBreaking, setIsBreaking] = useState<boolean | null>(null)
    const [limit, setLimit] = useState<number>(16)

    const debouncedSearch = useDebounce(search, 1000);
    // const [isFeatured, setIsFeatured] = useState<string>('')

    const { data: newsData, isLoading, refetch } = useQuery({
        queryKey: ['get-news', currentpage, debouncedSearch, isBreaking,limit],
        queryFn: () => getNewsApi(limit, currentpage, debouncedSearch, isBreaking),
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
         <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

  {/* LEFT SIDE */}
  <div className="flex flex-col md:flex-row gap-3 w-full lg:w-[80%]">

    {/* Search */}
    <div className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-black/10 transition">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search news..."
        className="w-full outline-none text-sm bg-transparent"
      />
    </div>

    {/* Filters */}
    <div className="flex items-center gap-2 flex-wrap bg-white border border-gray-100 rounded-2xl p-2 shadow-sm">

      <button
        onClick={() => setIsBreaking(null)}
        className="px-5 py-2 rounded-full text-sm font-medium bg-black text-white shadow-md transition hover:scale-[1.05] active:scale-95"
      >
        All
      </button>

      <button
        onClick={() => setIsBreaking(true)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${isBreaking
          ? "bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm"
          : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        Featured ⭐
      </button>

      <button
        onClick={() => setIsBreaking(false)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${isBreaking === false
          ? "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm"
          : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        Normal
      </button>

    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex items-center justify-end gap-3 w-full lg:w-auto">

    {/* Limit Selector */}
    <select
      value={limit}
      onChange={(e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
      }}
      className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm shadow-sm outline-none cursor-pointer"
    >
      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
        <option key={num} value={num}>
          {num} / page
        </option>
      ))}
    </select>

    {/* Export Button (MAIN) */}
    <button
      onClick={() => downloadNewsExcel(newsData?.data?.data || [])}
      className="
        relative overflow-hidden
        px-6 py-2.5 rounded-xl
        bg-linear-to-r from-black via-gray-900 to-black
        text-white font-semibold text-sm
        shadow-lg
        hover:scale-105 active:scale-95
        transition-all duration-300
        group
      "
    >
      <span className="relative z-10 flex items-center gap-2">
         Export Analytics
      </span>

      <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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

            <Pagination onNext={onNext} onPrev={onPrev} currentPage={newsData?.data?.meta?.page} totalPages={newsData?.data?.meta?.totalPage}></Pagination>


        </div>
    )
}
