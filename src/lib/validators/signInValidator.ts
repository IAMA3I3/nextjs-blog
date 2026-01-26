import { SignInFormData } from "@/types/auth"

export type SignInFormError = {
    default?: string
    email?: string
    password?: string
}

export function validateSignIn(data: SignInFormData) {
    let errors: SignInFormError = {}

    if (data.email.trim() === "") {
        errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email"
    }

    if (data.password === "") {
        errors.password = "Password is required"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}