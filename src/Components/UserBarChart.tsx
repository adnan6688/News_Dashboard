

type Props = {
    data: { month: number; users: number }[];
    yearInfo : number,
    setYearInfo: React.Dispatch<React.SetStateAction<number>>
};

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function UserBarChart({ data , yearInfo , setYearInfo }: Props) {
  

    // Max users ber kora hocche percentage height calulate korar jonnno
    const maxUsers = Math.max(...data.map((d) => d.users), 1);

    return (
   <div className="w-full bg-white rounded-3xl p-5 sm:p-6  transition-all  shadow">
    {/* Header */}
    <div className="flex flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
        <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
                User Growth
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                Monthly overview of registered users
            </p>
        </div>

        <select
            value={yearInfo}
            onChange={(e) => setYearInfo(Number(e.target.value))}
            className="cursor-pointer border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white outline-none transition-all focus:ring-2 focus:ring-sky-500/20"
        >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
        </select>
    </div>

    {/* Chart */}
    <div className="overflow-x-auto no-scrollbar">
        <div className="flex items-end justify-between sm:mt-6 gap-3 sm:gap-4 h-64 min-w-125 sm:min-w-full">

            {data?.map((item, index) => {
                const barHeight = `${(item.users / maxUsers) * 100}%`;
                
        
                const barColors = [
                    'bg-sky-200',    // Jan
                    'bg-emerald-200',// Feb
                    'bg-indigo-200', // Mar
                    'bg-amber-200',  // Apr
                    'bg-rose-300',   // May
                    'bg-violet-200', // Jun
                    'bg-teal-200',   // Jul
                    'bg-orange-200', // Aug
                    'bg-cyan-200',   // Sep
                    'bg-fuchsia-200',// Oct
                    'bg-pink-200',   // Nov
                    'bg-blue-200'    // Dec
                ];
                
                const currentBarColor = barColors[index % barColors.length];

                return (
                    <div key={index} className="flex flex-col items-center flex-1 group">

                        {/* Bar */}
                        <div className="relative w-full flex items-end justify-center h-48 mb-3">

                            {/* Tooltip */}
                            <div className="absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-md">
                                {item.users.toLocaleString()}
                            </div>

                            {/* Bar track */}
                            <div className="w-6 sm:w-8 md:w-10 bg-slate-100 rounded-xl h-full flex items-end overflow-hidden">

                                {/* Dynamic Colorful Bar */}
                                <div
                                    className={`w-full ${currentBarColor} rounded-t-xl transition-all duration-500 group-hover:brightness-105`}
                                    style={{ height: barHeight }}
                                />

                            </div>
                        </div>

                        {/* Value */}
                        <span className="text-sm font-semibold text-slate-800">
                            {item.users}
                        </span>

                        {/* Month */}
                        <span className="text-[14px] text-slate-400 mt-1  ">
                            {months[item.month - 1]}
                        </span>

                    </div>
                );
            })}

        </div>
    </div>
</div>
    );
}