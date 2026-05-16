import type { LucideIcon } from "lucide-react";


type Props = {
    count: number;
    icon: LucideIcon;
    title: string;
    iconColor?: string;
    bgColor?: string;
};

export default function StatsCard({ count, icon: Icon, title, iconColor = "text-purple-600", bgColor = "from-purple-50", }: Props) {
    return (
        <div
            className={`
        group relative overflow-hidden rounded-3xl 
        bg-linear-to-br ${bgColor} to-white 
        border border-gray-100 p-6 shadow-sm 
        hover:shadow-2xl transition-all duration-300 hover:-translate-y-1
      `}
        >
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-purple-200/30 rounded-full blur-2xl group-hover:scale-125 transition" />

            <div className="flex items-center justify-between relative">
                <div>
                    <p className={`${iconColor} text-sm sm:text-[17px]`}>{title}</p>
                    <h1 className={`text-4xl font-extrabold ${iconColor} mt-3`}>
                        {count}
                    </h1>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:rotate-6 transition">
                    <Icon className={`size-7 ${iconColor}`} />
                </div>
            </div>
        </div>
    );
}