import { PageCard } from "@/components/container/Card";
import RenderEditPostForm from "@/components/post/RenderEditPostForm";
import { LoadingText } from "@/components/ui/Loading";
import { Suspense } from "react";

type EditPostProps = {
    params: Promise<{
        id: string
    }>
}

export default async function EditPost({ params }: EditPostProps) {

    const { id } = await params

    return (
        <>
            <h3 className=" text-2xl mb-6">Edit Post</h3>
            <PageCard centerAlign>
                <h6 className=" text-lg text-center mb-4">Edit this post</h6>
                <Suspense fallback={<LoadingText text="Loading" />}>
                    <RenderEditPostForm id={id} />
                </Suspense>
            </PageCard>
        </>
    )
}