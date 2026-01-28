import MyPostsList from "@/components/post/MyPostsList";
import { Button } from "@/components/ui/Button";
import { LoadingText } from "@/components/ui/Loading";
import Link from "next/link";
import { Suspense } from "react";

export default function MyPosts() {

    return (
        <div className=" space-y-6">
            <div className=" flex gap-4 flex-wrap justify-between items-center">
                <h3 className=" text-xl">My Posts</h3>
                <Link href={"/my-posts/create"}>
                    <Button text="Create Post" />
                </Link>
            </div>
            {/* render my posts list */}
            <Suspense fallback={<LoadingText text="Loading posts" />}>
                <MyPostsList />
            </Suspense>
        </div>
    )
}