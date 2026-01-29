import getAuthUser from "@/lib/auth/getAuthUser"
import { Post } from "@/types/post"
import { ObjectId, WithId } from "mongodb"
import { RenderError } from "../ui/RenderError"
import { getCollection } from "@/lib/db"
import { PageCard } from "../container/Card"
import Link from "next/link"
import DeletePostButton from "./DeletePostButton"

export default async function MyPostsList() {

    const authUser = await getAuthUser()

    if (!authUser) {
        throw new Error("Access denied")
    }

    let posts: WithId<Post>[] = []

    try {
        const postsCollection = await getCollection<Post>("posts")
        posts = await postsCollection.find({ userId: ObjectId.createFromHexString(authUser.userId) }).sort({ $natural: -1 }).toArray()
    } catch (err) {
        return <RenderError err={err} />
    }

    return (
        <PageCard fullWidth>
            <div className=" space-y-3">
                {
                    posts.length === 0 && (
                        <p className=" text-lg text-center text-gray-500">No Post Found</p>
                    )
                }
                {
                    posts.map(post => (
                        <div key={post._id.toString()} className=" py-2 px-4 rounded-lg border-2 border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className=" flex-1 overflow-hidden">
                                <Link href={`/my-posts/${post._id.toString()}`} className=" text-lg line-clamp-2 md:line-clamp-none md:truncate text-center md:text-left hover:text-blue-500">{post.title}</Link>
                            </div>
                            <div className=" flex gap-4 items-center justify-center flex-wrap">
                                <Link href={`/my-posts/${post._id.toString()}`} className=" text-sm font-semibold text-green-500 hover:underline">View</Link>
                                <Link href={`/my-posts/${post._id.toString()}/edit`} className=" text-sm font-semibold text-blue-500 hover:underline">Edit</Link>
                                <DeletePostButton id={post._id.toString()} from="POSTS" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </PageCard>
    )
}