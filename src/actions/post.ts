"use server"

import getAuthUser from "@/lib/auth/getAuthUser";
import { getCollection } from "@/lib/db";
import { PostFormError, validatePost } from "@/lib/validators/postValidator";
import { ActionResponse } from "@/types/action";
import { Post, PostFormData } from "@/types/post";
import { ObjectId, WithId } from "mongodb";
import { redirect } from "next/navigation";

export async function deletePostAction(id: string) {

    // check if user is logged in
    const authUser = await getAuthUser()
    if (!authUser) {
        redirect("/")
    }

    const postCollection = await getCollection<Post>("posts")
    let post: WithId<Post> | null = null
    try {
        post = await postCollection.findOne({ _id: ObjectId.createFromHexString(id) })
    } catch (err) {
        throw new Error("Post not found")
    }

    if (!post) {
        throw new Error("Error fetching post")
    }

    try {
        await postCollection.findOneAndDelete({ _id: post._id })
    } catch (err) {
        throw new Error("Error deleting post")
    }

    return { success: true }
}

export async function updatePostAction(data: PostFormData, id: string): ActionResponse<PostFormData, PostFormError> {

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

    // fetch post
    const postCollection = await getCollection<Post>("posts")
    let post: WithId<Post> | null = null
    try {
        post = await postCollection.findOne({ _id: ObjectId.createFromHexString(id) })
    } catch (err) {
        return {
            success: false,
            data,
            errors: {
                default: err instanceof Error ? err.message : "Error fetching post"
            }
        }
    }

    if (!post) {
        return {
            success: false,
            data,
            errors: {
                default: "Post not found"
            }
        }
    }

    if (authUser.userId !== post.userId.toString()) {
        return {
            success: false,
            data,
            errors: {
                default: "Access denied"
            }
        }
    }

    // update post
    try {
        await postCollection.findOneAndUpdate({ _id: post._id }, {
            $set: {
                title: data.title,
                content: data.content
            }
        })
    } catch (err) {
        return {
            success: false,
            data,
            errors: {
                default: err instanceof Error ? err.message : "Error updating post"
            }
        }
    }


    return { success: true, errors: {}, data }
}

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