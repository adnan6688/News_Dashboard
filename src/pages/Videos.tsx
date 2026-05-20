import { useMutation, useQuery } from "@tanstack/react-query"
import { UploadVideo, videosApi } from "../api/newsapi"
import VideosCard from "../Components/VideosCard"
import Loader from "../Components/Loader"
import Toast from "../Toast/Toast"
import { useState } from "react"
import Pagination from "../Components/Pagination"

export default function Videos() {
  const [link, setLink] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1)


  const { data: VideosData, isLoading: VideoLoad, refetch } = useQuery({
    queryKey: ['videos-data', currentPage],
    queryFn: () => videosApi(10, currentPage),
    retry: false,
    refetchOnWindowFocus: false
  })



  const { mutate, isPending } = useMutation({
    mutationFn: (link: string) => UploadVideo(link),

    onSuccess: (data: { success: boolean; message: string }) => {
      if (refetch) {
        refetch()
      }
      Toast({
        type: "success",
        message: data.message,
      });
      setLink("")

    },

    onError: (err: Error) => {
      console.log(err.message);
    },
  })



  const onPrev = () => {

   
    setCurrentPage(currentPage - 1)
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className="">
      {/* Upload Form */}
      <div className="max-w-3xl mx-auto">

        <form
          className="flex flex-col sm:flex-row gap-3 items-center bg-white p-4 rounded-2xl  border border-gray-100 mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            mutate(link);
          }}
        >
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste video link here..."
            required
            className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl transition shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            {isPending ? "Uploading..." : "Upload"}
          </button>
        </form>

      </div>
      {/* Video Section */}
      {VideoLoad ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : VideosData?.data?.length > 0 ? (
        <VideosCard type={"Video"} refetch={refetch} videos={VideosData?.data} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-700">
          <p className="text-lg">No videos found 😕</p>
          <span className="text-sm mt-1">Try uploading some videos</span>
        </div>
      )}

      <Pagination onNext={onNext} onPrev={onPrev} currentPage={currentPage} totalPages={VideosData?.totalPage}></Pagination>
    </div>
  )
}
