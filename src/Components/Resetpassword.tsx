import React, { useState } from 'react'
import bannar from './../assets/bannar.png'
import logo from './../assets/WhatsApp_Image_2026-05-12_at_9.52.35_AM__1_-removebg-preview.png'
import Toast from '../Toast/Toast'
import { useNavigate, useParams } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import { updatepasswordapi } from '../api/newsapi'
import { getErrorMessage } from '../Utils/errorMessage'

export default function ResetPassword() {

    const navigate = useNavigate()
    const { email } = useParams()


    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [load, setLoad] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        setLoad(true)
        e.preventDefault()

        console.log(password, confirmPassword)
        if (!password || !confirmPassword) {
            Toast({ type: 'error', message: 'All fields are required!' })
            return
        }

        if (password.length < 8) {
            Toast({ type: 'error', message: 'Password must be at least 8 characters' })
            return
        }

        if (password !== confirmPassword) {
            Toast({ type: 'error', message: 'Passwords do not match!' })
            return
        }

        try {
            if (email) {
                const result = await updatepasswordapi(email, password)
                if (result?.success) {
                    Toast({ type: 'success', message: result?.message })
                    navigate('/')
                }
            }
        }
        catch (err) {

            const message = getErrorMessage(err)
            Toast({ type: 'error', message })
        }
        finally {
            setLoad(false)
        }
    }

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
            style={{ backgroundImage: `url(${bannar})` }}
        >

            <div className="w-full max-w-md bg-white/90 space-y-4 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Logo */}
                <div className="sm:w-80 mx-auto">
                    <img src={logo} alt="logo" />
                </div>

                {/* Text */}
                <h2 className="text-center text-xl font-semibold">
                    Reset your password
                </h2>

                <p className="text-center text-sm text-gray-600">
                    Create a new password for your account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* New Password */}
                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                    </div>

                    {/* Confirm Password */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={load}
                        className="w-full cursor-pointer rounded-xl bg-[#1E466E] hover:bg-[#163552] transition-all duration-300 py-4 text-white text-lg shadow-lg disabled:opacity-60"
                    >
                        {load ? 'Updating......' : 'Reset Password'}
                    </button>

                </form>

            </div>
        </div>
    )
}