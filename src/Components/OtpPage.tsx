import { useRef, useState } from "react"
import bannar from './../assets/bannar.png'
import logo from './../assets/WhatsApp_Image_2026-05-12_at_9.52.35_AM__1_-removebg-preview.png'
import Toast from "../Toast/Toast"
import { useNavigate, useParams } from "react-router"
import { verifyOTp } from "../api/newsapi"
import { getErrorMessage } from "../Utils/errorMessage"


export default function OtpPage() {

    const { email } = useParams()
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])

    // handle change
    const handleChange = (value: string, index: number) => {

        if (!/^[0-9]*$/.test(value)) return

        const newOtp = [...otp]

        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    // backspace
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {

        e.preventDefault()

        const paste = e.clipboardData.getData("text").slice(0, 6).split("")

        const newOtp = [...otp]

        paste.forEach((val, i) => {
            if (i < 6 && /^[0-9]$/.test(val)) {
                newOtp[i] = val
            }
        })

        setOtp(newOtp)

        const nextIndex = paste.length >= 6 ? 5 : paste.length
        inputsRef.current[nextIndex]?.focus()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setLoad(true)
        e.preventDefault()

        const finalOtp = otp.join("")

        if (finalOtp.length !== 6) {
            Toast({ type: "error", message: "Enter full OTP!" })
            return
        }

        try {
            if (email && finalOtp) {
                const res = await verifyOTp(email, finalOtp)
                if (res.success) {
                    Toast({ type: 'success', message: res.message })
                    navigate(`/reset-password/${email}`)
                }
            }
        } catch (err) {
            const message = getErrorMessage(err)
            Toast({ type: 'error', message })
        } finally {
            setLoad(false)
        }

        // Toast({ type: "success", message: "OTP submitted!" })
    }

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
            style={{ backgroundImage: `url(${bannar})` }}
        >

            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 space-y-5">

                {/* Logo */}
                <div className="sm:w-72 mx-auto">
                    <img src={logo} alt="logo" />
                </div>

                {/* Text */}
                <h2 className="text-center text-xl font-semibold">
                    Enter OTP Code
                </h2>

                <p className="text-center text-sm text-gray-600">
                    We sent a 6-digit code to your email
                </p>

                {/* OTP Inputs */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="flex justify-between gap-2">

                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputsRef.current[index] = el
                                }}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                maxLength={1}
                                className="w-12 h-12   text-center text-xl border border-blue-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        ))}

                    </div>

                    <button
                        type="submit"
                        disabled={load}
                        className="w-full cursor-pointer bg-[#1E466E] hover:bg-[#163552] text-white py-3 rounded-xl transition"
                    >
                        {load ? "Verifying..." : "Verify OTP"}
                    </button>

                </form>

            </div>
        </div>
    )
}