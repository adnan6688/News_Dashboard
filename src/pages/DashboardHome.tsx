import { useAuth } from "../Hook/useAuth";
import Breakingnews from "./Breakingnews";

export default function DashboardHome() {
    const { user, refetchUser } = useAuth();

    return (
        <div className="bg-amber-500">
            {/* সেলফ-ক্লোজিং ট্যাগ ব্যবহার করা রিঅ্যাক্টের বেস্ট প্র্যাকটিস */}
            <Breakingnews />
        </div>
    );
}