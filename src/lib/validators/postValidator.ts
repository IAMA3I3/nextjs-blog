import { PostFormData } from "@/types/post"

export type PostFormError = {
    default?: string
    title?: string
    content?: string
}

export function validatePost(data: PostFormData) {
    let errors: PostFormError = {}

    if (!data.title.trim()) {
        errors.title = "Title is required"
    } else if (data.title.length > 100) {
        errors.title = "Title cannot exceed 100 characters"
    }

    if (!data.content.trim()) {
        errors.content = "Content is required"
    } else if (data.content.length > 10000) {
        errors.content = "Content cannot exceed 10,000 characters"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}