import { useQuery } from "@tanstack/react-query";
import { breakingNewsApi } from "../api/newsapi"; 

type NewsItem = {
    _id: string;
    title: string;
};

export default function Breakingnews() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news"],
        queryFn: breakingNewsApi, 
    });

    const news: NewsItem[] = data?.news || [];

    if (isLoading) return <div className="p-2 text-white">Loading...</div>;
    if (isError) return <div className="p-2 text-red-500">Error loading news</div>;

    return (
        <div className="bg-black text-white py-2">
           {news.length}
        </div>
    );
}