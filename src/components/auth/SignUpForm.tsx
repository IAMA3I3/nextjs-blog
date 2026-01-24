"use client"

import Link from "next/link"
import { Button } from "../ui/Button"
import { ChangeEvent, FormEvent, useState } from "react"

type SignUpFormData = {
    email: string
    password: string
    confirmPassword: string
}

type SignUpFormError = {
    email?: string
    password?: string
    confirmPassword?: string
}

const initialData: SignUpFormData = {
    email: "",
    password: "",
    confirmPassword: ""
}

export default function SignUpForm() {

    const [data, setData] = useState<SignUpFormData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<SignUpFormError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const isValid = (data: SignUpFormData) => {
        let tempError: SignUpFormError = {}

        if (data.email.trim() === "") {
            tempError.email = "Email is required"
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(data.email)) {
            tempError.email = "Invalid email"
        }
        if (data.password.length < 4) {
            tempError.password = "Password must contain 4 or more characters"
        } else if (data.confirmPassword !== data.password) {
            tempError.confirmPassword = "Not a match with password"
        }

        setError(tempError)
        return Object.keys(tempError).length === 0
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        if (isValid(data)) {
            await new Promise(resolve => setTimeout(resolve, 2000)) // delay 2s
            console.log(data)
            setData(initialData)
        }
        setIsLoading(false)
    }

    return (
        <div className=" w-full">
            <form onSubmit={onFormSubmit} className=" w-full space-y-4">
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
                <div className=" space-y-1">
                    <label htmlFor="confirmPassword" className=" text-sm font-semibold text-muted">Confirm Password</label>
                    <input value={data.confirmPassword} onChange={onInputChange} type="password" id="confirmPassword" name="confirmPassword" className=" w-full py-1 px-3 outline-none border-2 border-gray-300 rounded focus:border-blue-500" />
                    {error.confirmPassword && <p className=" text-sm font-semibold text-red-400">{error.confirmPassword}</p>}
                </div>
                <Button isLoading={isLoading} type="submit" text="REGISTER" size="large" />
                <p className=" text-sm font-semibold text-muted">Already have an account? <Link href={"/sign-in"} className=" text-blue-500 hover:underline">Login</Link></p>
            </form>
        </div>
    )
}