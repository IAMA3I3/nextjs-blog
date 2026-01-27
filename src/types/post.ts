import { ObjectId } from "mongodb"

export type PostFormData = {
    title: string
    content: string
}

export type Post = {
    _id: ObjectId
    title: string
    content: string
    userId: ObjectId
}