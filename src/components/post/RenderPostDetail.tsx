import { getCollection } from "@/lib/db"
import { Post } from "@/types/post"
import { ObjectId } from "mongodb"
import { notFound } from "next/navigation"
import { PageCard } from "../container/Card"
import PageHeader from "../layout/PageHeader"

type RenderPostDetailProps = {
    id: string
}

export default async function RenderPostDetail({ id }: RenderPostDetailProps) {

    if (id.length !== 24) {
        notFound()
    }

    const postCollection = await getCollection<Post>("posts")
    const post = await postCollection.findOne({ _id: ObjectId.createFromHexString(id) })

    if (!post) {
        notFound()
    }

    return (
        <>
            <PageHeader subtitle={post.title} currentPage="Post Detail" />
            <PageCard centerAlign>
                <p className=" text-sm font-semibold text-gray-500">{post._id.getTimestamp().toLocaleString()}</p>
                <h3 className=" text-2xl mb-4">{post.title}</h3>
                <p>{post.content}</p>
            </PageCard>
        </>
    )
}