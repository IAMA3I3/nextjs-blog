"use client"

import Link from "next/link"
import { Button } from "../ui/Button"
import { ChangeEvent, FormEvent, useState } from "react"
import { SignUpFormData } from "@/types/auth"
import { signUpAction } from "@/actions/auth"
import { SignUpFormError, validateSignUp } from "@/lib/validators/signUpValidator"

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

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validateSignUp(data)

        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        const result = await signUpAction(data)

        if (!result.success) {
            setError(result.errors)
            setIsLoading(false)
            return
        }

        setData(initialData)
        setError({})
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