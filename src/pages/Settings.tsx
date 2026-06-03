/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../Hook/useAuth";
import { changePassword, updateUserapi } from "../api/newsapi";
import Toast from "../Toast/Toast";

import { getErrorMessage } from "../Utils/errorMessage";
import type { IUser } from "../Context/userType";
import { PasswordInput } from "../Components/PasswordInput";

export default function Settings() {
    const { user: information, refetchUser } = useAuth();

    const [load, setLoad] = useState(false);

    const fileRef = useRef<HTMLInputElement | null>(null);

    const [user, setUser] = useState<IUser | null>(null);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [preview, setPreview] = useState<string | null>(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // set user from auth
    useEffect(() => {
        if (information) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(information);

            if (typeof information.image === "string") {
                setPreview(information.image);
            }
        }
    }, [information]);

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, [name]: value };
        });
    };

    // handle image
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    // profile update
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);

        try {
            if (!user) return;

            const result = await updateUserapi({
                name: user.name,
                birth_date: user.birth_date,
                image: imageFile || undefined,
            });

            if (result?.success) {
                Toast({
                    type: "success",
                    message: "Profile Update Successfully!",
                });

                refetchUser();
            }
        } catch (err) {
            Toast({
                type: "error",
                message: "Profile Not update!",
            });
        } finally {
            setLoad(false);
        }
    };

    // password change
    const passwordHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!currentPassword || !newPassword || !confirmPassword) {
                return Toast({
                    type: "error",
                    message: "All fields are required!",
                });
            }

            if (currentPassword === newPassword) {
                return Toast({
                    type: "error",
                    message: "Current and new password cannot be same!",
                });
            }

            if (newPassword !== confirmPassword) {
                return Toast({
                    type: "error",
                    message: "Password mismatch!",
                });
            }

            if (newPassword.length < 6) {
                return Toast({
                    type: "error",
                    message: "Password too short!",
                });
            }

            const result = await changePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            });

            if (result?.success) {
                Toast({
                    type: "success",
                    message: result.message,
                });

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            const message = getErrorMessage(err);

            Toast({
                type: "error",
                message,
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 bg-gray-50">

            {/* PROFILE CARD */}
            <div className="bg-white shadow-sm rounded-xl p-4 max-w-md mx-auto">

                {/* IMAGE */}
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">

                        <img
                            src={
                                preview ||
                                (typeof information?.image === "string"
                                    ? information.image
                                    : "https://i.ibb.co/2nYyQ2v/default-avatar.png")
                            }
                            className="w-20 h-20 rounded-full object-cover border"
                            alt="profile"
                        />

                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-blue-950 text-white p-1 rounded-full"
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

                    <h2 className="mt-2 font-semibold">
                        {information?.name}
                    </h2>

                    <p className="text-xs text-gray-500">
                        {information?.email}
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">

                    <input
                        name="name"
                        value={user?.name || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Name"
                    />

                    <input
                        name="email"
                        value={information?.email || ""}
                        disabled
                        className="w-full p-2 border rounded bg-gray-100"
                    />

                    <input
                        type="date"
                        name="birth_date"
                        value={user?.birth_date?.split("T")[0] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <button
                        disabled={load}
                        className="w-full bg-blue-950 text-white py-2 rounded"
                    >
                        {load ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>

            {/* PASSWORD CARD */}
            <div className="bg-white shadow-sm rounded-xl p-4 max-w-lg mx-auto">

                <h2 className="font-semibold mb-3">
                    Change Password
                </h2>

                <form onSubmit={passwordHandle} className="space-y-3">

                    <PasswordInput label="Current Password" name="current_password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current password" />

                    <PasswordInput label="New Password" name="new_password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />

                    <PasswordInput label="Confirm Password" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />

                    <button className="w-full bg-blue-950 text-white py-2 rounded">
                        Change Password
                    </button>
                </form>
            </div>

        </div>
    );
}