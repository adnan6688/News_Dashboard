import { useQuery } from "@tanstack/react-query"
import { getNewsApi } from "../api/newsapi"
import Loader from "../Components/Loader"
import NewsCard from "../Components/NewsCard"
import Pagination from "../Components/Pagination"
import { useState } from "react"






export default function Newspage() {

    const [currentpage, setCurrentPage] = useState<number>(1)

    const { data: newsData, isLoading } = useQuery({
        queryKey: ['get-news', currentpage],
        queryFn: () => getNewsApi(12, currentpage),
        retry: false,
        refetchOnWindowFocus: false,
    })

    console.log(newsData?.data)


    const onPrev = () => {


        setCurrentPage(currentpage - 1)
    }

    const onNext = () => {
        setCurrentPage(currentpage + 1)
    }


    return (
        <div>

            {
                isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader />
                    </div>
                ) : newsData?.data?.data?.length > 0 ? (
                    <NewsCard data={newsData?.data?.data} />
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
