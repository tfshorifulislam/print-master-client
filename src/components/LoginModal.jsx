"use client";

import React, { useState } from "react";
import {  Xmark } from "@gravity-ui/icons";

import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";

export default function LoginModal() {

  return (
    <Modal>
      {/* Open Modal Button */}
      <Button className="cursor-pointer px-5 py-2.5 rounded-sm md:rounded-lg font-medium text-white bg-linear-to-r from-[#0055ff] to-[#0024b5] hover:opacity-90 transition">
        Login
      </Button>

      {/* Backdrop */}
      <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
        <Modal.Container placement="center">

          {/* Dialog */}
          <Modal.Dialog className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border-0 bg-white p-0 shadow-2xl">

            {/* Close Button */}
            <Modal.CloseTrigger className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0055ff] text-[#0024b5] hover:bg-[#0055ff] hover:text-white transition">
              <Xmark className="size-5" />
            </Modal.CloseTrigger>

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* LEFT SIDE */}
              <div className="p-5 md:p-8">

                {/* Header */}
                <Modal.Header className="mb-8 flex flex-col items-start p-0">

                  <Modal.Heading className="text-4xl font-bold text-black">
                    Welcome Back
                  </Modal.Heading>

                  <p className="mt-2 text-gray-500">
                    Login to continue your creative journey.
                  </p>

                </Modal.Header>

                {/* Body */}
                <Modal.Body className="p-1 md:p-5">

                  <Surface className="border-0 bg-transparent shadow-none">

                    <form
                      className="flex flex-col gap-5"
                    >

                      {/* EMAIL */}
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

                      </TextField>

                      {/* PASSWORD */}
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
                      </TextField>

                      {/* Forgot Password */}
                      <button
                        type="button"
                        className="w-fit text-sm font-medium text-[#0055ff] hover:underline"
                      >
                        Forgot your password?
                      </button>

                      {/* Login Button */}
                      <Button
                        type="submit"
                        className="mt-2 rounded-sm md:rounded-lg text-base font-semibold text-white bg-linear-to-r from-[#0055ff] to-[#0024b5] hover:opacity-90 transition"
                      >
                        Log in
                      </Button>

                      {/* Divider */}
                      <div className="flex items-center gap-4 py-1">

                        <div className="h-px flex-1 bg-gray-300"></div>

                        <span className="text-sm text-gray-500">
                          OR
                        </span>

                        <div className="h-px flex-1 bg-gray-300"></div>

                      </div>

                      {/* Google Login */}
                      <button
                        type="button"
                        className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white font-medium text-black hover:bg-gray-50 transition"
                      >

                        <img
                          src="https://www.svgrepo.com/show/475656/google-color.svg"
                          alt="google"
                          className="h-5 w-5"
                        />

                        Continue with Google

                      </button>

                      {/* Signup */}
                      <p className="pt-1 text-center text-sm text-gray-600">

                        Don’t have an account?{" "}

                        <span className="cursor-pointer font-semibold text-[#0055ff] hover:underline">
                          Sign up
                        </span>

                      </p>

                    </form>

                  </Surface>

                </Modal.Body>

              </div>

              {/* RIGHT SIDE */}
              <div className="hidden md:flex items-center justify-center bg-[#f7f7f7] p-10">

                <div className="text-center">

                  {/* QR */}
                  <div className="mx-auto mb-6 flex h-52 w-52 items-center justify-center rounded-[28px] bg-white shadow-md">

                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=print-master"
                      alt="qr"
                      className="h-40 w-40"
                    />

                  </div>

                  <h2 className="mb-3 text-3xl font-bold text-black">
                    Instant Login
                  </h2>

                  <p className="max-w-xs text-gray-600">
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