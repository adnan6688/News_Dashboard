import { useQuery } from "@tanstack/react-query";
import { allFeaturednewsFn } from "../api/newsapi";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import axiosInstance from "../BaseUrl/baseurl";
import Pagination from "../Components/Pagination";
import Loader from "../Components/Loader";

export default function Featured() {


  const [search, setSearch] = useState<string>("");
  const [finalSearch, setFinalSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [load, setLoad] = useState<null | number>(null)
  const [isBreaking, setIsBreaking] = useState<boolean | null>(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      setFinalSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data: featuredNews, isLoading, isError, refetch } = useQuery(
    {
      queryKey: ['featureds', finalSearch, isBreaking, currentPage],
      queryFn: () => allFeaturednewsFn(currentPage, finalSearch, isBreaking)
    })

  const onNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const Onprev = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleToggleBreaking = async (newsId: number) => {
    setLoad(newsId)
    try {

      const result = await axiosInstance.patch(`/news/latest-news-add-from-news?newsId=${newsId}`)

      console.log(result , "äsdfasdfasdf")
      if (result?.data) {

        refetch()
        Toast({ type: 'success', message: result?.data?.message })
      }
    } catch (err) {
      console.log(err)
    }
    finally {
      setLoad(null)
    }
  }




  if (isError) {
    return <div className="flex justify-center items-center">
      <h1>Something Wrong!!</h1>
    </div>
  }
  return (
    <div className=" bg-gray-50  py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Featured News
        </h2>

        {/* Static Search */}
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search news..."
          className="w-full lg:w-80 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Static Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {/* All Button */}
        <button
          onClick={() => {
            setSearch("");
            setFinalSearch("");
            setIsBreaking(null);
            setCurrentPage(1)
            refetch();
          }}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm ${isBreaking === null
            ? "bg-red-600 text-white"
            : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
        >
          All
        </button>

        {/* Featured Button */}
        <button
          onClick={() => setIsBreaking(true)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm ${isBreaking === true
            ? "bg-red-600 text-white"
            : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
        >
          Featured
        </button>

        {/* Regular / Not Featured Button */}
        <button
          onClick={() => setIsBreaking(false)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm ${isBreaking === false
            ? "bg-red-600 text-white"
            : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
        >
          Regular
        </button>
      </div>

      {/* Grid - 5 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading ? <div className=" col-span-full"><Loader></Loader></div> : !featuredNews?.data?.data?.length ? <div className=" col-span-full flex justify-center items-center">
          <h1>Date not found!</h1>
        </div> : featuredNews?.data?.data.map((item: {
          _id: string;
          newsId: number;
          image: string;
          link: string;
          title: string;
          date: string; // ISO date string
          isBreaking: boolean;
          createdAt: string;
          updatedAt: string;
        }) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group border border-gray-100 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden m-2.5 rounded-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover group-hover:scale-105 group-hover:brightness-95 transition-all duration-500"
              />

              {/* Date Tag over Image (Glassmorphism Effect) */}
              <span className="absolute bottom-2 right-2 backdrop-blur-md bg-black/40 text-white text-[10px] font-medium px-2 py-1 rounded-md tracking-wider">
                {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>

              {/* Featured Badge */}
              {item.isBreaking && (
                <span className="absolute top-2 left-2 bg-linear-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md animate-pulse">
                  Featured
                </span>
              )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between grow pt-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-relaxed group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 mt-4 items-stretch">
                {/* Featured Button */}
                <button
                  onClick={() => handleToggleBreaking(item?.newsId)}
                  className={`flex-1 cursor-pointer text-[14px] font-semibold px-3 py-2.5 rounded-xl transition-all active:scale-95 duration-200 flex items-center justify-center gap-1.5 ${item?.isBreaking
                    ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                    }`}
                >
                  <span>
                    {load === item?.newsId ? "⏳" : item?.isBreaking ? "⭐" : "✨"}
                  </span>
                  {load === item?.newsId
                    ? "..."
                    : item?.isBreaking
                      ? "Featured"
                      : "Feature"}
                </button>

                {/* Read Article Button */}
                <a
                  href={item?.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-[14px] font-semibold px-3 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-300 active:scale-95 text-center flex items-center justify-center shadow-sm"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div>
          <Pagination currentPage={currentPage} onPrev={Onprev} onNext={onNext} totalPages={featuredNews?.data?.meta.totalpage}></Pagination>
        </div>
      </div>
    </div>
  );
}