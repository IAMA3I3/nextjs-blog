import RenderPostDetail from "@/components/post/RenderPostDetail"
import { LoadingText } from "@/components/ui/Loading"
import { Suspense } from "react"

type PostDetailProps = {
    params: Promise<{
        id: string
    }>
}

export default async function PostDetail({ params }: PostDetailProps) {
    const { id } = await params

    return (
        <div className=" py-12">
            <div className=" container px-6 mx-auto space-y-12">
                <Suspense fallback={<LoadingText text="Loading Post" />}>
                    <RenderPostDetail id={id} />
                </Suspense>
            </div>
        </div>
    )
}