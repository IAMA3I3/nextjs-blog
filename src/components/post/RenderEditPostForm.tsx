import { getCollection } from "@/lib/db";
import { RenderError } from "../ui/RenderError";
import PostForm from "./PostForm";
import { notFound, redirect } from "next/navigation";
import { ObjectId, WithId } from "mongodb";
import { Post } from "@/types/post";
import { SessionPayload } from "@/lib/sessions";
import getAuthUser from "@/lib/auth/getAuthUser";

type RenderEditPostFormProps = {
    id: string
}

export default async function RenderEditPostForm({ id }: RenderEditPostFormProps) {

    const authUser = await getAuthUser()

    if (id.length !== 24) {
        notFound()
    }

    let post: WithId<Post> | null = null

    try {
        const postCollection = await getCollection<Post>("posts")
        post = await postCollection.findOne({ _id: ObjectId.createFromHexString(id) })
    } catch (err) {
        return <RenderError err={err} />
    }

    if (!post) {
        notFound()
    }

    if (authUser?.userId !== post.userId.toString()) {
        notFound()
    }

    return (
        <PostForm type="UPDATE" post={{ id: post._id.toString(), title: post.title, content: post.content }} />
    )
}