import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { deleteBannarApi } from "../api/newsapi";
import Toast from "../Toast/Toast";
import Loader from "./Loader";
import { downloadBannerExcel } from "../Utils/excelDataBannars";

export type BannerItem = {
  _id: string;
  title: string;
  image: string;
  link: string;
  publicId?: string;
  createdAt: string;
  updatedAt?: string;
  click: number,
  impressions: number
};

interface BannersProps {
  banners: BannerItem[];
  isLoading?: boolean;
  type?: 'bannar' | 'dashboard',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch?: () => Promise<any>,
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>

}

export default function Bannars({ banners, isLoading, type, refetch , limit , setLimit}: BannersProps) {


  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteBannarApi(id),

    onSuccess: (data) => {
      if (refetch) {
        refetch();
      }

      if (data?.success) {
        Toast({
          type: "success",
          message: data?.message,
        });
      }
    },

    onError: () => {
      console.log("error occured");
    },
  });

  console.log(banners)



  if (isLoading) {
    return (
      <div className=" text-center">
        <div className="flex items-center justify-center gap-3 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-500 font-medium">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading promotional banners...</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-transparent">


      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

        {/* LEFT: Title Section */}
        <div className="flex items-center gap-2.5">

          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Active Promotional Banners
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Manage your advertisement and announcement banners.
            </p>
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">

          {/* Limit Selector */}
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              // setCurrentPage(1);
            }}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-sm outline-none cursor-pointer"
          >
            {[10, 20, 30, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num} / page
              </option>
            ))}
          </select>

          {/* Export Button */}
          <button
            onClick={() => downloadBannerExcel(banners || [])}
            className="
        relative overflow-hidden
        px-5 py-2.5 rounded-xl
        bg-linear-to-r from-black to-gray-950
        text-white text-sm font-semibold
        shadow-md
        hover:scale-105 active:scale-95
        transition-all duration-300
        group
      "
          >
            <span className="relative z-10 flex items-center gap-2">
               Export Analytics
            </span>

            {/* shine effect */}
            <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

        </div>

      </div>


      <button className="my-2" disabled={isPending}>
        {isPending && (
          <span className="flex items-center gap-2">
            <span className=" border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Deleting...
          </span>
        )}
      </button>


      <div className={`grid grid-cols-1 md:grid-cols-2 ${type == 'bannar' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}  gap-6`}>
        {isLoading ? <div className=" col-span-full">
          <Loader></Loader>
        </div> : banners && banners.length > 0 ? (
          banners?.map((banner, index) => (
            <div
              key={banner._id || index}
              className="relative group rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >

              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden">

                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x337?text=Banner";
                  }}
                />

                {/* dark gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                {/* top badges */}
                <div className="absolute top-3 right-3 flex gap-2">

                  <span className="px-2.5 py-1 text-[10px] font-semibold bg-emerald-500 text-white rounded-full shadow-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </span>

                  <span className="px-2.5 py-1 text-[10px] font-semibold bg-black/60 text-white rounded-full backdrop-blur-md">
                    Banner
                  </span>

                </div>

                {/* Delete */}
                {type === "bannar" && (
                  <button
                    onClick={() => mutate(banner?._id)}
                    className="
          absolute top-3 left-3
          w-9 h-9 flex items-center justify-center
          rounded-xl
          bg-white/90 backdrop-blur-md
          text-red-500
          opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
          transition-all duration-300
          hover:bg-red-500 hover:text-white
        "
                  >
                    <Trash2 size={16} />
                  </button>
                )}

              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 bg-linear-to-b from-white to-slate-50">

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-black transition">
                  {banner.title}
                </h3>

                {/* Link */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="text-slate-400">🔗</span>

                  <a
                    href={banner.link}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:text-black transition"
                  >
                    {banner.link || "No URL"}
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-2">

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-[12px] text-slate-400">Clicks</p>
                    <p className="text-sm font-bold text-slate-800">{banner?.click}</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-[12px] text-slate-400">Impressions</p>
                    <p className="text-sm font-bold text-slate-800">{banner?.impressions}</p>
                  </div>

                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-100 text-[13px] text-slate-400">


                  <span className="text-[13px] text-slate-400 flex items-center gap-1">

                    Published:
                    <span className="text-slate-600 font-medium">
                      {banner.createdAt
                        ? new Date(banner.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        : "N/A"}
                    </span>
                  </span>

                </div>

              </div>
            </div>
          )


          )
        ) : (

          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 italic font-medium">
            No active banners found at the moment.
          </div>
        )}
      </div>
    </div>
  );
}