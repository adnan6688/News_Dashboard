import { useState } from "react";
import Toast from "../Toast/Toast";
import { deleteNotifications, getAllNotifications, sendNotifications } from "../api/newsapi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Pagination from "../Components/Pagination";

export default function Notifications() {
    const [open, setOpen] = useState(false);
    const [loadNoti, setLoadNoti] = useState<boolean>(false)


    const [currentPage, setCurrentpage] = useState<number>(1)


    const { data: allNotificationsData, isLoading, refetch } = useQuery({
        queryKey: ['notifications', currentPage],
        queryFn: () => getAllNotifications(currentPage),
        retry: false,
        refetchOnWindowFocus: false
    })



    const [form, setForm] = useState({
        title: "",
        headline: "",
        link: "",
    });

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // File select handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;

        setFile(selectedFile);

        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);
        }
    };

    // Send function
    const handleSend = async () => {
        setLoadNoti(true)
        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("headline", form.headline);
        formData.append("link", form.link);

        if (file) {
            formData.append("file", file);
        }
        if (!form.title || !form.headline || !form.link || !file) {
            Toast({ type: 'error', message: 'All Fields are requireds!' })
            return
        }
        try {
            const reuslt = await sendNotifications({ title: form.title, headline: form.headline, link: form.link, file })
            console.log("result",reuslt)

            if (reuslt?.success) {
                refetch()
                setFile(null)
                setForm({ title: "", headline: "", link: "" })
                Toast({ type: 'success', message: reuslt?.message })

            }
        } catch {
            //
            console.log("error notifications")
        }
        finally {
            setLoadNoti(false)
        }

        console.log("🚀 Sending Notification:");
        console.log("Form:", form);
        console.log("File:", file);

        setOpen(false);
    };



    const onPrev = () => {
        setCurrentpage(currentPage - 1)
    }

    const onNext = () => {
        setCurrentpage(currentPage + 1)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteNotifications(id)
            refetch()
            Toast({ type: 'success', message: 'Notification remove successfully!' })

        }
        catch {
            //
        }
    }




    return (
        <div className=" relative min-h-screen bg-gray-50">

            {/* Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setOpen(true)}
                    className="bg-sky-950 cursor-pointer hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    Send Notification
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed p-5 sm:p-0 inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">

                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-black"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-5">
                            Create Notification
                        </h2>

                        {/* Inputs */}
                        <div className="space-y-4">

                            <input
                                type="text"
                                name="title"
                                placeholder="Title (Latest News)"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <textarea
                                name="headline"
                                placeholder="Headline"
                                value={form.headline}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="text"
                                name="link"
                                placeholder="News Link"
                                value={form.link}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            {/* File Upload */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 outline-none file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-sky-950 file:text-white file:rounded-md"
                            />

                            {/* Preview */}
                            {preview && (
                                <div className="mt-2">
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-6">

                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSend}
                                className="px-4 cursor-pointer py-2 rounded-lg bg-sky-950 text-white hover:bg-sky-900"
                            >
                                {
                                    loadNoti ? "Sending..." : 'send'
                                }
                            </button>

                        </div>

                    </div>
                </div>
            )}


            <div className="w-full overflow-x-auto my-4">
                <table className=" w-full bg-white border border-slate-200 rounded-lg overflow-hidden">

                    {/* Head */}
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="text-left p-3 text-sm font-bold text-slate-700">Image</th>
                            <th className="text-left p-3 text-sm font-bold text-slate-700">Title</th>
                            <th className="text-left p-3 text-sm font-bold text-slate-700">Headline</th>
                            <th className="text-left p-3 text-sm font-bold text-slate-700">Link</th>
                            <th className="text-center p-3 text-sm font-bold text-slate-700">Send</th>
                            <th className="text-left p-3 text-sm font-bold text-slate-700">Action</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {isLoading ? <tr>
                            <td colSpan={10}>
                                <div className="flex justify-center items-center w-full py-6">
                                    <Loader />
                                </div>
                            </td>
                        </tr> : !allNotificationsData?.data?.length ? <tr>
                            <td colSpan={10}>
                                <div className="flex justify-center items-center w-full py-10">
                                    <p className="text-gray-400 text-sm">
                                        No notifications found
                                    </p>
                                </div>
                            </td>
                        </tr> : allNotificationsData?.data?.map((news: { image: string, title: string, _id: string, headline: string, link: string, createdAt: Date }) => (
                            <tr key={news._id} className="transition">

                                <td className="p-3">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                </td>

                                <td className="p-3 font-semibold text-slate-800">
                                    {news.title}
                                </td>

                                <td className="p-3 text-sm text-slate-600">
                                    {news.headline}
                                </td>

                                <td className="p-3">
                                    <a
                                        href={news.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Open
                                    </a>
                                </td>

                                <td className="p-3 text-xs text-slate-500">
                                    {new Date(news.createdAt).toLocaleString()}
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDelete(news?._id)}
                                        className="px-3 cursor-pointer py-1 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination onNext={onNext} onPrev={onPrev} currentPage={allNotificationsData?.meta?.page} totalPages={allNotificationsData?.meta?.totalpage}></Pagination>
        </div>
    );
}