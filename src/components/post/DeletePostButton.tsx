"use client"

import { deletePostAction } from "@/actions/post"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type DeletePostButtonProps = {
    from: "POSTS" | "DETAIL",
    id: string
}

export default function DeletePostButton({ id, from }: DeletePostButtonProps) {

    const router = useRouter()

    const deletePost = async () => {
        const res = await deletePostAction(id)

        if (!res.success) {
            toast.error("Error deleting post")
        }

        toast.success("Post deleted")

        if (from === "POSTS") {
            router.refresh()
        }
        router.replace("/my-posts")
    }

    return (
        <button onClick={deletePost} className=" text-sm font-semibold cursor-pointer text-red-500 hover:underline">Delete</button>
    )
}