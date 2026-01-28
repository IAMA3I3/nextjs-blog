import { PageCard } from "@/components/container/Card"
import { RenderError } from "@/components/ui/RenderError"
import getAuthUser from "@/lib/auth/getAuthUser"
import { getCollection } from "@/lib/db"
import { Post } from "@/types/post"
import { ObjectId, WithId } from "mongodb"
import Link from "next/link"
import { notFound } from "next/navigation"

type PostDetailProps = {
    params: Promise<{
        id: string
    }>
}

export default async function MyPostDetail({ params }: PostDetailProps) {
    const { id } = await params

    if (id.length !== 24) {
        notFound()
    }

    const authUser = await getAuthUser()

    if (!authUser) {
        throw new Error("Access denied")
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

    if (authUser.userId !== post.userId.toString()) {
        throw new Error("Access denied")
    }

    return (
        <PageCard fullWidth>
            <p className=" text-sm font-semibold text-gray-500">{post._id.getTimestamp().toLocaleString()}</p>
            <h3 className=" text-2xl mb-4">{post.title}</h3>
            <p>{post.content}</p>
            <div className=" mt-8 flex gap-4 items-center flex-wrap">
                <Link href={`/my-posts/${post._id.toString()}/edit`} className=" text-sm font-semibold text-blue-500 hover:underline">Edit</Link>
                <button className=" text-sm font-semibold cursor-pointer text-red-500 hover:underline">Delete</button>
            </div>
        </PageCard>
    )
}