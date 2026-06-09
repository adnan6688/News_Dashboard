
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface BannerDetail {
  _id: string;
  title: string;
  image: string;
  link: string;
}

interface NewsDetail {
  _id: string;
  title: string;
  image: string;
  link: string;
  createdAt: string;
  author?: {
    name: string;
    image: string;
  };
}

export interface CtrAnalyticsItem {
  _id: string;
  clicks: number;
  impressions: number;
  type: "BANNAR" | "NEWS";
  user: User;
  bannarsId?: BannerDetail;
  newsId?: NewsDetail;
  createdAt: string;
  updatedAt: string;
  ctr: string;
}

interface CtrAnalyticsProps {
  data: CtrAnalyticsItem[];
}

export default function CtrAnalyticsList({ data }: CtrAnalyticsProps) {


  return (
    <div className=" bg-transparent">

      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 ">CTR Performance Monitor</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Real-time click-through rate analysis for news & banners.</p>
        </div>
      </div>


      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        {!data?.length ? <div className="col-span-full flex items-center justify-center py-10">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-red-500">
              CTR Not Found
            </h1>
            <p className="text-gray-500 mt-2">
              No CTR data available right now.
            </p>
          </div>
        </div> : data?.map((item) => {

          const isBanner = item.type === "BANNAR";
          const targetData = isBanner ? item.bannarsId : item.newsId;


          if (!targetData) return null;

          const ctrValue = parseFloat(item.ctr);

          return (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-350 overflow-hidden group"
            >

              <div className="w-full sm:w-40 h-32.5 sm:h-auto relative shrink-0 bg-slate-50">
                <img
                  src={targetData.image}
                  alt={targetData.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/300x200?text=No+Image';
                  }}
                />

                <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider text-white ${isBanner ? 'bg-indigo-500 shadow-indigo-100' : 'bg-sky-500 shadow-sky-100'
                  } shadow-sm`}>
                  {item.type}
                </span>
              </div>


              <div className="p-4 flex flex-col justify-between grow min-w-0 gap-4 bg-linear-to-br from-white to-slate-50/20">


                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                    <a href={targetData.link} target="_blank" rel="noreferrer" className="hover:underline">
                      {targetData.title}
                    </a>
                  </h3>


                  {!isBanner && (item.newsId as NewsDetail)?.author && (
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <img
                        src={(item.newsId as NewsDetail).author?.image}
                        alt={(item.newsId as NewsDetail).author?.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-[14px] font-medium text-slate-500">
                        By {(item.newsId as NewsDetail).author?.name}
                      </span>
                    </div>
                  )}
                </div>


                <div className="flex items-center justify-between pt-3 border-t border-slate-100/70">

                  <div className="flex gap-4">
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Impressions</p>
                      <p className="text-sm font-bold text-slate-700 mt-0.5">{item.impressions}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Clicks</p>
                      <p className="text-sm font-bold text-slate-700 mt-0.5 flex items-center gap-1">
                        {item.clicks}
                        {item.clicks > 0 && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>}
                      </p>
                    </div>
                  </div>


                  <div className={`flex flex-col items-end justify-center px-3.5 py-1.5 rounded-xl border ${ctrValue > 50
                    ? 'bg-emerald-50/60 border-emerald-100 text-emerald-600'
                    : ctrValue > 0
                      ? 'bg-blue-50/60 border-blue-100 text-blue-600'
                      : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}>
                    <p className="text-[9px] font-extrabold uppercase tracking-widest opacity-80">CTR</p>
                    <p className="text-base font-black tracking-tight mt-0.5">
                      {item.ctr}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}