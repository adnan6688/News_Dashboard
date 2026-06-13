import { useQuery } from "@tanstack/react-query";
import { bithdayMessagUPdate, informaitonOFbithday } from "../api/newsapi";
import { useState } from "react";
import Toast from "../Toast/Toast";

type User = {
    id: number;
    name: string;
    image?: string;
    date: string;
};



function UserCard({ user }: { user: User }) {
    return (
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
                {user.image ? (
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-100"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        {user.name.charAt(0)}
                    </div>
                )}

                <div>
                    <h3 className="font-semibold text-gray-800">
                        {user.name}
                    </h3>
                    <p className="text-xs font-medium text-pink-500 bg-pink-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        Birthday 🎉
                    </p>
                </div>
            </div>

            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {new Date(user.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </span>
        </div>
    );
}

export default function BirthDay() {

    const [message, setMessage] = useState<string>('')
    const [load, setLoad] = useState<boolean>(false)
    const { data: bithdayInformatoin, refetch } = useQuery({
        queryKey: ['infor'],
        queryFn: informaitonOFbithday
    })



    const editmessage = async (id: string) => {

        setLoad(true)
        try {
            const res = await bithdayMessagUPdate(id, message)

            if (res?.result?.success) {
                Toast({
                    type: "success",
                    message: "Birthday message updated successfully!"
                });
                refetch()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoad(false)
        }
    }



    return (
        <div className="max-w-5xl mx-auto p-6 space-y-10 min-h-screen bg-gray-50/50">
            {/* Input Message Area */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                <input
                    defaultValue={bithdayInformatoin?.data?.birthday?.message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all text-gray-700"
                />
                <button
                    disabled={!message}
                    onClick={() =>
                        editmessage(bithdayInformatoin?.data?.birthday?._id)
                    }
                    className={`bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 rounded-2xl py-3 font-semibold shadow-md shadow-pink-200 transition-all active:scale-95 ${!message ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                        }`}
                >
                    {load ? 'Updating..' : 'Update'}
                </button>
            </div>

            {/* Birthday Sections */}
            <div className="space-y-10">
                <BirthdaySection
                    title="🎂 Today's Birthday"
                    users={bithdayInformatoin?.data?.today}
                />

                <BirthdaySection
                    title="🎉 Tomorrow's Birthday"
                    users={bithdayInformatoin?.data?.tomorrow}
                />

                <BirthdaySection
                    title="📅 Upcoming 5 Days"
                    users={bithdayInformatoin?.data?.nextFiveDays}
                />
            </div>
        </div>
    );
}

function BirthdaySection({ title, users, }: { title: string; users: User[]; }) {

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 tracking-wide flex items-center gap-2">
                {title}
                <span className="text-xs font-normal bg-gray-200/60 text-gray-600 px-2 py-0.5 rounded-full">
                    {users?.length}
                </span>
            </h2>

            {/* Responsive layout */}
            <div className="
                flex flex-col gap-3
                md:grid md:grid-cols-2 md:gap-4
                lg:grid lg:grid-cols-3
            ">
                {users?.length > 0 ? (
                    users?.map((user) => (
                        <UserCard key={user?.id} user={user} />
                    ))
                ) : (
                    <div className="col-span-full py-6 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <p className="text-gray-400 text-sm">
                            No birthdays found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}