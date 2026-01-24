"use client"

import Link from "next/link"
import { Button } from "../ui/Button"

export default function SignInForm() {

    return (
        <div className=" w-full">
            <form className=" w-full space-y-4">
                <div className=" space-y-1">
                    <label htmlFor="email" className=" text-sm font-semibold text-muted">Email</label>
                    <input type="email" id="email" name="email" className=" w-full py-1 px-3 outline-none border-2 border-gray-300 rounded focus:border-blue-500" />
                </div>
                <div className=" space-y-1">
                    <label htmlFor="password" className=" text-sm font-semibold text-muted">Password</label>
                    <input type="password" id="password" name="password" className=" w-full py-1 px-3 outline-none border-2 border-gray-300 rounded focus:border-blue-500" />
                </div>
                <Button type="submit" text="LOGIN" size="large" />
                <p className=" text-sm font-semibold text-muted">Don't have an account? <Link href={"/sign-up"} className=" text-blue-500 hover:underline">Register</Link></p>
            </form>
        </div>
    )
}