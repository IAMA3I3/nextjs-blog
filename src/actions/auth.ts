"use server"

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/sessions";
import { SignUpFormError, validateSignUp } from "@/lib/validators/signUpValidator";
import { ActionResponse } from "@/types/action";
import { SignUpFormData } from "@/types/auth";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";

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

    // redirect
    redirect("/dashboard")

    return { success: true, errors: {}, data }
}