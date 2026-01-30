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
        errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email format"
    }

    if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (data.password && data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}