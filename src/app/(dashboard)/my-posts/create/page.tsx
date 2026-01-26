import { PageCard } from "@/components/container/Card";
import PostForm from "@/components/post/PostForm";

export default function CreatePost() {

    return (
        <>
            <h3 className=" text-2xl mb-6">Create Post</h3>
            <PageCard centerAlign>
                <h6 className=" text-lg text-center mb-4">Create a new post</h6>
                <PostForm type="CREATE" />
            </PageCard>
        </>
    )
}