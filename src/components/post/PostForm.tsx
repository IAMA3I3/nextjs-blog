"use client"

import { PostFormData } from "@/types/post"
import { Button } from "../ui/Button"
import { ChangeEvent, FormEvent, useState } from "react"
import { PostFormError, validatePost } from "@/lib/validators/postValidator"
import { createPostAction } from "@/actions/post"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

type PostFormProps = {
    type: "CREATE"
} | {
    type: "UPDATE"
    post: PostFormData & { id: string }
}

const initialData: PostFormData = {
    title: "",
    content: ""
}

export default function PostForm(props: PostFormProps) {

    const [data, setData] = useState<PostFormData>(props.type === "CREATE" ? initialData : { title: props.post.title, content: props.post.content })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<PostFormError>({})

    const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { isValid, errors } = validatePost(data)
        if (!isValid) {
            setError(errors)
            setIsLoading(false)
            return
        }

        const result = props.type === "CREATE" ? await createPostAction(data) : { success: false, errors: { default: "Update Action is not yet defined" }, data }
        if (!result.success) {
            setError(result.errors)
            setIsLoading(false)
            return
        }

        setData(props.type === "CREATE" ? initialData : data)
        setIsLoading(false)
        setError({})
        toast.success("Post created")
        redirect("/my-posts")
    }

    return (
        <form onSubmit={onFormSubmit} className=" w-full space-y-4">
            {error.default && <p className=" text-sm font-semibold text-red-400 text-center">{error.default}</p>}
            <div className=" space-y-1">
                <label htmlFor="title" className=" text-sm font-semibold text-muted">Title</label>
                <input value={data.title} onChange={onInputChange} type="text" id="title" name="title" className=" w-full py-1 px-3 outline-none border-2 border-gray-300 rounded focus:border-blue-500" />
                {error.title && <p className=" text-sm font-semibold text-red-400">{error.title}</p>}
            </div>
            <div className=" space-y-1">
                <label htmlFor="content" className=" text-sm font-semibold text-muted">Content</label>
                <textarea value={data.content} onChange={onInputChange} name="content" id="content" className=" min-h-24 w-full py-1 px-3 outline-none border-2 border-gray-300 rounded focus:border-blue-500"></textarea>
                {error.content && <p className=" text-sm font-semibold text-red-400">{error.content}</p>}
            </div>
            <Button isLoading={isLoading} type="submit" text="SUBMIT" />
        </form>
    )
}