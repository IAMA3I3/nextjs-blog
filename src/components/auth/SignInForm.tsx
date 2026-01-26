"use client"

import Link from "next/link"
import { Button } from "../ui/Button"
import { SignInFormData } from "@/types/auth"
import { ChangeEvent, FormEvent, useState } from "react"
import { SignInFormError, validateSignIn } from "@/lib/validators/signInValidator"
import toast from "react-hot-toast"
import { signInAction } from "@/actions/auth"
import { redirect } from "next/navigation"

const initialData: SignInFormData = {
    email: "",
    password: ""
}

export default function SignInForm() {

    const [data, setData] = useState<SignInFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<SignInFormError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateSignIn(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        // login
        const result = await signInAction(data)
        if (!result.success) {
            setError(result.errors)
            setIsLoading(false)
            return
        }

        setData(initialData)
        setError({})
        setIsLoading(false)
        toast.success("Welcome back")
        redirect("/dashboard")
    }

    return (
        <div className=" w-full">
            <form onSubmit={onFormSubmit} className=" w-full space-y-4">
                {error.default && <p className=" text-sm font-semibold text-red-400 text-center">{error.default}</p>}
                <div className=" space-y-1">
                    <label htmlFor="email" className=" text-sm font-semibold text-muted">Email</label>
                    <input value={data.email} onChange={onInputChange} type="text" id="email" name="email" className=" w-full py-1 px-3 outline-none border-2 border-gray-300 rounded focus:border-blue-500" />
                    {error.email && <p className=" text-sm font-semibold text-red-400">{error.email}</p>}
                </div>
                <div className=" space-y-1">
                    <label htmlFor="password" className=" text-sm font-semibold text-muted">Password</label>
                    <input value={data.password} onChange={onInputChange} type="password" id="password" name="password" className=" w-full py-1 px-3 outline-none border-2 border-gray-300 rounded focus:border-blue-500" />
                    {error.password && <p className=" text-sm font-semibold text-red-400">{error.password}</p>}
                </div>
                <Button isLoading={isLoading} type="submit" text="LOGIN" size="large" />
                <p className=" text-sm font-semibold text-muted">Don't have an account? <Link href={"/sign-up"} className=" text-blue-500 hover:underline">Register</Link></p>
            </form>
        </div>
    )
}