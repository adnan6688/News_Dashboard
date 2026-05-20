import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { deleteBannarApi } from "../api/newsapi";
import Toast from "../Toast/Toast";

export type BannerItem = {
  _id: string;
  title: string;
  image: string;
  link: string;
  publicId?: string;
  createdAt: string;
  updatedAt?: string;
};

interface BannersProps {
  banners: BannerItem[];
  isLoading?: boolean;
  type?: 'bannar' | 'dashboard',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch?: () => Promise<any>
}

export default function Bannars({ banners, isLoading, type, refetch }: BannersProps) {


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


      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Active Promotional Banners</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Manage your advertisement and announcement banners.</p>
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
        {banners && banners.length > 0 ? (
          banners.map((banner, index) => (
            <div
              key={banner._id || index}
              className="relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              {/* Delete Button */}
              <button

                className="
    absolute top-3 left-3 z-20
    flex items-center justify-center
    w-10 h-10
    rounded-xl
    bg-white/90 backdrop-blur-md
    border border-red-100
    text-red-500
    shadow-md
    opacity-0 scale-75 -translate-y-2
    group-hover:opacity-100 
    group-hover:scale-100 
    group-hover:translate-y-0
    hover:bg-red-500
    hover:text-white
    hover:border-red-500
    transition-all duration-300 ease-out
  "
                onClick={() => mutate(banner?._id)}
              >
                <Trash2 size={18} strokeWidth={2.2} />
              </button>

              {/* Image */}
              <div className="w-full aspect-video overflow-hidden relative bg-slate-50 border-b border-slate-50">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x337?text=Banner+Image";
                  }}
                />

                {/* Active Badge */}
                <span className="absolute top-3 right-3 inline-flex items-center bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  Active
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between grow bg-linear-to-b from-white to-slate-50/20">
                <div className="space-y-2">
                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug tracking-tight group-hover:text-red-600 transition-colors duration-200">
                    {banner.title}
                  </h3>

                  {/* Link */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <svg
                      className="w-3.5 h-3.5 shrink-0 text-slate-350"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.172l1.54-1.54m6.574-7.062l1.54-1.54a4 4 0 10-5.656-5.656l-4 4a4 4 0 000 5.656"
                      />
                    </svg>

                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-red-500 truncate"
                    >
                      {banner.link || "No destination URL"}
                    </a>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100/70 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-slate-400">
                    ID:
                    <span className="font-mono text-slate-500 bg-slate-50 px-1 py-0.5 rounded text-[10px]">
                      {banner.publicId?.split("/").pop() || "N/A"}
                    </span>
                  </span>

                  <span className="text-slate-500">
                    {banner.createdAt
                      ? new Date(banner.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (

          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 italic font-medium">
            No active banners found at the moment.
          </div>
        )}
      </div>
    </div>
  );
}