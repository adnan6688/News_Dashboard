/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../Hook/useAuth";
import { updateUserapi } from "../api/newsapi";
import Toast from "../Toast/Toast";

export type UserType = {
    birthDayNotification: boolean;
    birth_date: string;
    breakingNewsNotification: boolean;
    createdAt: string;
    deviceId: null;
    email: string;
    image: string | File;
    isDelete: boolean;
    name: string;
    role: string;
    updatedAt: string;
    _id: string;
};

const initialData: UserType = {
    birthDayNotification: true,
    birth_date: "2004-12-05T18:00:00.000Z",
    breakingNewsNotification: true,
    createdAt: "2026-05-11T10:12:48.328Z",
    deviceId: null,
    email: "golamfaruk123@gmail.com",
    image:
        "https://res.cloudinary.com/dr9b7k8n7/image/upload/v1779075593/news/jmtrh8iojpity6kjpy9v.jpg",
    isDelete: false,
    name: "Golam Faruk Adnan",
    role: "ADMIN",
    updatedAt: "2026-05-18T09:29:34.913Z",
    _id: "6a01aba044d208433bf23505",
};

export default function Settings() {
    const { user: information, refetchUser } = useAuth();
    const [load, setLoad] = useState<boolean>(false)

    const fileRef = useRef<HTMLInputElement | null>(null);
    const [user, setUser] = useState<UserType>(initialData);


    const [preview, setPreview] = useState<string | null>(
        typeof information?.image === "string" ? information.image : null
    );


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);

        setUser((prev) => ({
            ...prev,
            image: file,
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoad(true)
        e.preventDefault();
        try {
            const result = await updateUserapi(user)
    
            if (result?.success) {
                Toast({ type: 'success', message: 'Profile Update Successfully!' })
                refetchUser()
  
            }
        } catch (err) {
            Toast({ type: 'error', message: 'Profile Not update!' })
        }
        finally {
            setLoad(false)
        }

    };

    return (
        <div className="flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">

                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28">
                        <img
                            src={
                                preview ||
                                (typeof information?.image === "string"
                                    ? information.image
                                    : "https://i.ibb.co/2nYyQ2v/default-avatar.png")
                            }
                            alt="profile"
                            className="w-28 h-28 rounded-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full hover:bg-gray-800"
                        >
                            <Camera size={16} />
                        </button>

                        <input
                            type="file"
                            ref={fileRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    <h2 className="mt-3 text-xl font-semibold">
                        {information?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {information?.email}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <div>
                        <label className="text-sm">Name</label>
                        <input
                            name="name"
                            defaultValue={information?.name ?? ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg "
                        />
                    </div>

                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            name="email"
                            disabled
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg "
                        />
                    </div>

                    <div>
                        <label className="text-sm">Birth Date</label>
                        <input
                            type="date"
                            name="birth_date"
                            defaultValue={
                                information?.birth_date
                                    ? information.birth_date.split("T")[0]
                                    : ""
                            }
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg "
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={load}
                        className={`w-full bg-black text-white py-2 rounded-lg transition ${load ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 cursor-pointer"
                            }`}
                    >
                        {load ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}