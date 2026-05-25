"use client";

import { useRouter } from "next/navigation";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient, signIn } from "@/lib/auth-client";

export default function SignupPage() {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
        });
        if (data) {
            router.push("/");
            router.refresh();

            setTimeout(() => {
                window.location.href = "/";
            }, 100);
        }

        if (error) {
            alert("Something went wrong");
        }
    };

    const handleLoginWithGoogle = async () => {
        await signIn.social({
            provider: 'google'
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-neutral-900 shadow-xl rounded-2xl overflow-hidden">

                {/* LEFT SIDE */}
                <div className="p-6 md:p-10">
                    <h1 className="text-2xl md:text-4xl font-bold text-black dark:text-white">
                        Create Account
                    </h1>

                    <p className="text-sm text-gray-500 mt-2 mb-6">
                        Join and start your creative journey.
                    </p>

                    <Form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <TextField isRequired name="name" type="text">
                            <Label>Name</Label>
                            <Input placeholder="Enter your name" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                                ) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Must contain 1 uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Must contain 1 number";
                                }
                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input placeholder="Enter password" />
                            <Description>
                                8+ chars, 1 uppercase, 1 number
                            </Description>
                            <FieldError />
                        </TextField>

                        <Button
                            type="submit"
                            className="bg-blue-600 text-white rounded-lg"
                        >
                            <Check />
                            Create Account
                        </Button>
                    </Form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

                    {/* Google */}
                    <button
                        onSubmit={handleLoginWithGoogle}
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-50"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="hidden md:flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 p-10">
                    <div className="text-center">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=signup"
                            alt="qr"
                            className="mx-auto mb-5"
                        />

                        <h2 className="text-2xl font-bold">Instant Signup</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Scan QR code and continue from mobile
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}