import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { adminBannarsapi } from "../api/newsapi"
import Bannars from "../Components/Bannars"
import Pagination from "../Components/Pagination"
import UploadForm from "../Components/UploadForm"

export default function BannarsPage() {


    const [currentPage, setCurrentPage] = useState<number>(1)


    const { data: bannarsData, isLoading: bannarLoading, isError, refetch } = useQuery({
        queryKey: ['bannars-data', currentPage],
        queryFn: () => adminBannarsapi(10, currentPage),
        retry: false,
        refetchOnWindowFocus: false
    })
    const onPrev = () => {


        setCurrentPage(currentPage - 1)
    }

    const onNext = () => {
        setCurrentPage(currentPage + 1)
    }


    if (isError) {

        return <div className="flex justify-center items-center">
            <h1 className="text-red-500">Error</h1>
        </div>
    }
    return (
        <div>


            <UploadForm refetch={refetch}></UploadForm>
            <Bannars refetch={refetch} type="bannar" banners={bannarsData?.data?.data} isLoading={bannarLoading}></Bannars>

            <Pagination currentPage={currentPage} onNext={onNext} onPrev={onPrev} totalPages={bannarsData?.data?.meta?.totalpage || 1} ></Pagination>
        </div>
    )
}
