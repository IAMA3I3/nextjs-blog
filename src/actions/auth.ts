"use server"

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/sessions";
import { SignInFormError, validateSignIn } from "@/lib/validators/signInValidator";
import { SignUpFormError, validateSignUp } from "@/lib/validators/signUpValidator";
import { ActionResponse } from "@/types/action";
import { SignInFormData, SignUpFormData } from "@/types/auth";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}

export async function signInAction(data: SignInFormData): ActionResponse<SignInFormData, SignInFormError> {

    // validate data
    const { isValid, errors } = validateSignIn(data)
    if (!isValid) {
        return {
            success: false,
            data,
            errors
        }
    }

    const { email, password } = data

    // get the collection
    const userCollection = await getCollection("users")
    if (!userCollection) {
        return {
            success: false,
            data,
            errors: { default: "Server error" }
        }
    }

    // check if user exists
    const existingUser = await userCollection.findOne({ email })
    if (!existingUser) {
        return {
            success: false,
            data,
            errors: { default: "Invalid credential" }
        }
    }

    // check password
    const matchedPassword = await bcrypt.compare(password, existingUser.password)
    if (!matchedPassword) {
        return {
            success: false,
            data,
            errors: { default: "Invalid credential" }
        }
    }

    // create session
    await createSession(existingUser._id.toString())

    return { success: true, errors: {}, data }
}

export async function signUpAction(data: SignUpFormData): ActionResponse<SignUpFormData, SignUpFormError> {

    // validate data
    const { isValid, errors } = validateSignUp(data)

    if (!isValid) {
        return {
            success: false,
            errors,
            data
        }
    }

    // console.log(data)

    // await new Promise(resolve => setTimeout(resolve, 2000)) // delay 2s

    const { email, password } = data

    // get or create the collection in db
    const userCollection = await getCollection("users")
    if (!userCollection) {
        return {
            success: false,
            data,
            errors: {
                default: "Server error"
            }
        }
    }

    // check if user alredy exists
    const existingUser = await userCollection.findOne({ email })
    if (existingUser) {
        return {
            success: false,
            data,
            errors: {
                email: "Email already registered"
            }
        }
    }
    // console.log(userCollection)

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // insert into the db
    const results = await userCollection.insertOne({ email, password: hashedPassword })
    console.log(results)

    // create a session
    await createSession(results.insertedId.toString())

    return { success: true, errors: {}, data }
}