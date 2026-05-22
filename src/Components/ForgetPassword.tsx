import React, { useState } from 'react'
import bannar from './../assets/bannar.png'
import logo from '././../assets/WhatsApp_Image_2026-05-12_at_9.52.35_AM__1_-removebg-preview.png'
import Toast from '../Toast/Toast'
import { sendEmail } from '../api/newsapi'
import { getErrorMessage } from '../Utils/errorMessage'
import { useNavigate } from 'react-router'

export default function ForgetPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [load, setLoad] = useState<boolean>(false)


    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        setLoad(true)
        e.preventDefault()
        if (!email) {
            Toast({ type: 'error', message: 'Email must be included!' })
        }

        try {
            const result = await sendEmail(email)
            if (result.success) {
                Toast({ type: 'success', message: result?.message })
                navigate(`/otp-page/${email}`)
            }

        }
        catch (err) {
            const message = getErrorMessage(err)
            Toast({ type: 'error', message })
        } finally {
            setLoad(false)
        }
    }








    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
            style={{ backgroundImage: `url(${bannar})` }}
        >
            <div className="w-full max-w-md bg-white/90 space-y-3 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Logo */}
                <div className="sm:w-80 mx-auto">
                    <img className="" src={logo} alt="" />
                </div>

                {/* Text */}
                <h2 className="text-center text-xl font-semibold mb-2">
                    Forgot your password?
                </h2>

                <p className="text-center text-sm text-gray-600 mb-6">
                    Enter your email address and we’ll send you a verification OTP.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        type="submit"
                        disabled={load}
                        className="w-full cursor-pointer rounded-xl bg-[#1E466E] hover:bg-[#1E466E] transition-all duration-300 py-4 text-white  text-lg shadow-lg disabled:opacity-60"
                    >
                        {load ? 'Sending......' : 'Send OTP'}
                    </button>

                </form>

            </div>
        </div>
    )
}