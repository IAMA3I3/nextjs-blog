import { SignUpFormData } from "@/types/auth"

export type SignUpFormError = {
    default?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export function validateSignUp(data: SignUpFormData) {
    let errors: SignUpFormError = {}

    if (data.email.trim() === "") {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email";
    }

    if (data.password.length < 4) {
        errors.password = "Password must contain 4 or more characters";
    } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Not a match with password";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}