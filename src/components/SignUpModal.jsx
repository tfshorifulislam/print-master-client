"use client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Modal, Form, Input, Label, TextField } from "@heroui/react";

import { Xmark, } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function signupModal() {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData =  new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const {data, error } = await authClient.signUp.email({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    
    if(data){
        redirect('/')
    }
    if(error){
        alert('something is wrong')
    }
       console.log(data, error)
    }


    return (
        <Modal>
            {/* Open Modal Button */}
            <Button className="bg-none" variant="none">
                SignUp
            </Button>

            {/* Backdrop */}
            <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">

                {/* Container */}
                <Modal.Container
                    placement="center"
                    className="p-2 sm:p-4"
                >

                    {/* Dialog */}
                    <Modal.Dialog className="relative w-full max-w-[98vw] overflow-hidden rounded-2xl border-0 bg-white shadow-2xl md:max-w-5xl md:rounded-[32px]">

                        {/* Close Button */}
                        <Modal.CloseTrigger className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0055ff] text-[#0024b5] transition hover:bg-[#0055ff] hover:text-white md:right-5 md:top-5 md:h-11 md:w-11">

                            <Xmark className="size-5" />

                        </Modal.CloseTrigger>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2">

                            {/* LEFT SIDE */}
                            <div className="p-4 sm:p-6 md:p-8">

                                {/* Header */}
                                <Modal.Header className="mb-6 flex flex-col items-start p-0 md:mb-8">

                                    <Modal.Heading className="pr-10 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                                        Create Account
                                    </Modal.Heading>

                                    <p className="mt-2 text-sm text-gray-500 sm:text-base md:text-lg">
                                        Join and start your creative journey.
                                    </p>

                                </Modal.Header>


                                <Form className="flex flex-col gap-4"
                                onSubmit={onSubmit}
                                >
                                    <TextField
                                        isRequired
                                        name="name"
                                        type="text"
                                    >
                                        <Label>Name</Label>
                                        <Input placeholder="Inter Your Email" />
                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        isRequired
                                        name="email"
                                        type="email"
                                        validate={(value) => {
                                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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
                                                return "Password must contain at least one uppercase letter";
                                            }
                                            if (!/[0-9]/.test(value)) {
                                                return "Password must contain at least one number";
                                            }
                                            return null;
                                        }}
                                    >
                                        <Label>Password</Label>
                                        <Input placeholder="Enter your password" />
                                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                        <FieldError />
                                    </TextField>

                                    <Button
                                        className='bg-[#0055ff] rounded-sm md:rounded-lg'
                                        type="submit">
                                        <Check />
                                        Create an Account
                                    </Button>
                                </Form>

                                {/* Divider */}
                                <div className="flex items-center gap-4 py-1">

                                    <div className="h-px flex-1 bg-gray-300"></div>

                                    <span className="text-xs text-gray-500 sm:text-sm">
                                        OR
                                    </span>

                                    <div className="h-px flex-1 bg-gray-300"></div>

                                </div>

                                {/* Google Login */}
                                <button
                                    type="button"
                                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white text-sm font-medium text-black transition hover:bg-gray-50 md:h-14 md:rounded-2xl md:text-base"
                                >

                                    <FcGoogle className="text-xl" />
                                    Continue with Google
                                </button>

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="relative hidden items-center justify-center overflow-hidden bg-[#f7f7f7] p-6 md:flex lg:p-10">

                                {/* Blur Effects */}
                                <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#0055ff]/10 blur-3xl"></div>

                                <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-[#0024b5]/10 blur-3xl"></div>

                                {/* Content */}
                                <div className="relative z-10 text-center">

                                    {/* QR */}
                                    <div className="mx-auto mb-5 flex h-40 w-40 items-center justify-center rounded-3xl bg-white shadow-md lg:h-52 lg:w-52">

                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=print-master"
                                            alt="qr"
                                            className="h-32 w-32 lg:h-40 lg:w-40"
                                        />

                                    </div>

                                    <h2 className="mb-3 text-2xl font-bold text-black lg:text-3xl">
                                        Instant Login
                                    </h2>

                                    <p className="mx-auto max-w-xs text-sm text-gray-600 lg:text-base">
                                        Scan QR code with your phone and instantly
                                        access your account securely.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </Modal.Dialog>

                </Modal.Container>

            </Modal.Backdrop>
        </Modal>
    );
}