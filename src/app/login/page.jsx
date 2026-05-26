"use client";

import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()

    const onSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await signIn.email({
            email: userData.email,
            password: userData.password
        })


        if (data) {
            router.refresh()
            router.push('/')
        }
        if (error) {
            alert('something is wrong')
        }
        console.log(data, error)
    }

    const handleLoginWithGoogle = async () => {
        console.log('clicked')
        await signIn.social({
            provider: 'google'
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            {/* MAIN CARD */}
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SIDE */}
                <div className="p-6 sm:p-8 md:p-10">

                    {/* HEADER */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-4xl font-bold text-black">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-gray-500 mt-2">
                            Login to continue your creative journey.
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">

                        {/* EMAIL */}
                        <input
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full border p-3 rounded-xl outline-none"
                            required
                        />

                        {/* PASSWORD */}
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border p-3 rounded-xl outline-none"
                            required
                        />

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 rounded-xl"
                        >
                            Submit
                        </button>

                    </form>

                    {/* DIVIDER */}
                    <div className="flex items-center gap-4 my-4">

                        <div className="h-px flex-1 bg-gray-300"></div>
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-gray-300"></div>

                    </div>

                    {/* GOOGLE LOGIN */}
                    <button
                        onClick={handleLoginWithGoogle}
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-50"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    {/* SIGNUP */}
                    <p className="text-center text-sm mt-4 text-gray-600">
                        Don’t have an account?{" "}
                        <Link href="/signup" className="text-blue-500">
                            Sign up
                        </Link>
                    </p>

                </div>

                {/* RIGHT SIDE */}
                <div className="hidden md:flex items-center justify-center bg-gray-100 relative overflow-hidden">

                    {/* BLUR EFFECTS */}
                    <div className="absolute -top-20 -left-20 w-52 h-52 bg-blue-500/10 blur-3xl rounded-full"></div>
                    <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-indigo-500/10 blur-3xl rounded-full"></div>

                    {/* CONTENT */}
                    <div className="text-center z-10">

                        <div className="bg-white shadow-md p-4 rounded-2xl inline-block mb-4">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=print-master"
                                alt="qr"
                                className="w-40 h-40"
                            />
                        </div>

                        <h2 className="text-2xl font-bold mb-2">
                            Instant Login
                        </h2>

                        <p className="text-sm text-gray-600 max-w-xs">
                            Scan QR code with your phone and instantly access your account securely.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}