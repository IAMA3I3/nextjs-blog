import { BasicCard } from "@/components/container/Card";
import RecentPosts from "@/components/post/RecentPosts";
import { LoadingText } from "@/components/ui/Loading";
import Link from "next/link";
import { Suspense } from "react";

const quickLinks = [
    { text: "Add Post", href: "/my-posts/create" },
    { text: "My Posts", href: "/my-posts" }
]

export default function Dashboard() {

    return (
        <div className=" space-y-6">
            <h3 className=" text-xl">Dashboard</h3>
            <div className=" grid gap-6 grid-cols-1 md:grid-cols-2">
                <BasicCard>
                    <h6 className=" text-lg mb-4">Recent Posts</h6>
                    {/* recent posts */}
                    <Suspense fallback={<LoadingText text="Loading Posts" />}>
                        <RecentPosts />
                    </Suspense>
                </BasicCard>
                <BasicCard>
                    <h6 className=" text-lg mb-4">Quick Links</h6>
                    <div className=" space-y-3">
                        {
                            quickLinks.map(link => (
                                <Link
                                    key={link.text}
                                    href={link.href}
                                    className=" block text-sm font-semibold py-2 px-4 rounded bg-gray-100 hover:bg-gray-200"
                                >
                                    {link.text}
                                </Link>
                            ))
                        }
                    </div>
                </BasicCard>
            </div>
        </div>
    )
}