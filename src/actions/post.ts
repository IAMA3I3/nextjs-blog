"use server"

import getAuthUser from "@/lib/auth/getAuthUser";
import { getCollection } from "@/lib/db";
import { PostFormError, validatePost } from "@/lib/validators/postValidator";
import { ActionResponse } from "@/types/action";
import { PostFormData } from "@/types/post";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createPostAction(data: PostFormData): ActionResponse<PostFormData, PostFormError> {

    // check if user is logged in
    const authUser = await getAuthUser()
    if (!authUser) {
        redirect("/")
    }

    // validate form data
    const { isValid, errors } = validatePost(data)
    if (!isValid) {
        return {
            success: false,
            data,
            errors
        }
    }

    // add to the database and create if collection doesn't exist
    try {
        const postCollection = await getCollection("posts")
        const post = {
            title: data.title,
            content: data.content,
            userId: ObjectId.createFromHexString(authUser.userId)
        }
        await postCollection.insertOne(post)
    } catch (err) {
        return {
            success: false,
            data,
            errors: { default: err instanceof Error ? err.message : "An error occured" }
        }
    }

    return { success: true, errors: {}, data }
}