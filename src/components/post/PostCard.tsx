import Link from "next/link"
import { BasicCard } from "../container/Card"

type PostCardProps = {
    id: string
    createdAt: string
    title: string
    content: string
}

export default function PostCard({ id, createdAt, title, content }: PostCardProps) {

    return (
        <BasicCard hoverEffect>
            <p className=" text-xs font-semibold text-muted">{createdAt}</p>
            <Link href={`/posts/${id}`} className=" text-2xl mb-2 hover:text-blue-500">{title}</Link>
            <p className=" text-sm line-clamp-4">{content}</p>
        </BasicCard>
    )
}