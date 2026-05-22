/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../Hook/useAuth";
import { changePassword, updateUserapi } from "../api/newsapi";
import Toast from "../Toast/Toast";
import { PasswordInput } from "../Components/PasswordInput";
import { getErrorMessage } from "../Utils/errorMessage";

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

    const [currentPassword, setCurrentPassword] = useState<string | ''>('')
    const [newPassword, setNewPassword] = useState<string | ''>('')
    const [confirmPassword, setConfirmPassword] = useState<string | ''>('')

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


    const passwordHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            // empty check
            if (!currentPassword || !newPassword || !confirmPassword) {
                return Toast({
                    type: "error",
                    message: "All fields are required!",
                });
            }

            // current & new password same
            if (currentPassword === newPassword) {
                return Toast({
                    type: "error",
                    message: "Current password and new password cannot be the same!",
                });
            }

            // confirm password check
            if (newPassword !== confirmPassword) {
                return Toast({
                    type: "error",
                    message: "New password and confirm password do not match!",
                });
            }

            // password length check
            if (newPassword.length < 6) {
                return Toast({
                    type: "error",
                    message: "Password must be at least 6 characters!",
                });
            }


            const result = await changePassword({ currentPassword, newPassword, confirmPassword })
            if (result?.success) {
                Toast({
                    type: "success",
                    message: result?.message,
                });
            }


        } catch (err) {
            const message = getErrorMessage(err)
            Toast({
                type: "error",
                message: message,
            });
        }
    };




    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 bg-gray-50">

            {/* Profile Card */}
            <div className="w-full bg-white border border-gray-100 shadow-sm rounded-xl p-4 max-w-md mx-auto">

                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">

                        <img
                            src={
                                preview ||
                                (typeof information?.image === "string"
                                    ? information.image
                                    : "https://i.ibb.co/2nYyQ2v/default-avatar.png")
                            }
                            alt="profile"
                            className="w-20 h-20 rounded-full object-cover border border-blue-950/20"
                        />

                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-blue-950 text-white p-1.5 rounded-full"
                        >
                            <Camera size={12} />
                        </button>

                        <input
                            type="file"
                            ref={fileRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    <h2 className="mt-2 text-base font-semibold text-gray-800">
                        {information?.name}
                    </h2>

                    <p className="text-[11px] text-gray-500">
                        {information?.email}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">

                    <div>
                        <label className="text-xs text-gray-600 font-medium">
                            Name
                        </label>

                        <input
                            name="name"
                            defaultValue={information?.name ?? ""}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-blue-950"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-600 font-medium">
                            Email
                        </label>

                        <input
                            name="email"
                            disabled
                            value={user.email}
                            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-100 text-gray-500"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-600 font-medium">
                            Birth Date
                        </label>

                        <input
                            type="date"
                            name="birth_date"
                            defaultValue={
                                information?.birth_date
                                    ? information.birth_date.split("T")[0]
                                    : ""
                            }
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-blue-950"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={load}
                        className={`w-full py-2 rounded-lg text-sm text-white font-medium transition
                ${load
                                ? "bg-blue-950/50 cursor-not-allowed"
                                : "bg-blue-950 hover:opacity-90"
                            }`}
                    >
                        {load ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>

            {/* Password Card */}
            <div className="w-full bg-white border border-gray-100 shadow-sm rounded-xl p-4 max-w-md mx-auto">

                <div className="mb-4">
                    <h2 className="text-base font-semibold text-gray-800">
                        Change Password
                    </h2>

                    <p className="text-[11px] text-gray-500 mt-1">
                        Keep your account secure.
                    </p>
                </div>

                <form onSubmit={passwordHandle} className="space-y-3">

                    <PasswordInput
                        label="Current Password"
                        name="current_password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password"
                    />

                    <PasswordInput
                        label="New Password"
                        name="new_password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                    />

                    <PasswordInput
                        label="Confirm Password"
                        name="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-950 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}