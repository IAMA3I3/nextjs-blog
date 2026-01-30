import { ObjectId } from "mongodb"

export type SignUpFormData = {
    email: string
    password: string
    confirmPassword: string
}

export type SignInFormData = {
    email: string
    password: string
}

export type User = {
    _id: ObjectId
    email: string
    password: string
}