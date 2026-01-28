import { getCollection } from "@/lib/db"
import { Post } from "@/types/post"
import PostCard from "./PostCard"
import { RenderError } from "../ui/RenderError"
import { WithId } from "mongodb"

export const revalidate = 60

export default async function RenderPosts() {

    let posts: WithId<Post>[] = []

    try {
        const postCollection = await getCollection<Post>("posts")
        posts = await postCollection.find().sort({ $natural: -1 }).toArray()
    } catch (err) {
        return <RenderError err={err} />
    }


    return (
        <>
            {
                posts.length === 0 && (
                    <h2 className=" text-3xl font-bold text-gray-300 text-center">No Post Yet</h2>
                )
            }
            <div className=" grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    posts.map(post => (
                        <PostCard
                            key={post._id.toString()}
                            id={post._id.toString()}
                            createdAt={post._id.getTimestamp().toLocaleString()}
                            title={post.title}
                            content={post.content}
                        />
                    ))
                }
            </div>
        </>
    )
}