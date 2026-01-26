import Link from "next/link";

export default function MyPosts() {

    return (
        <>
            My Posts <br />
            <Link href={"/my-posts/create"} className=" text-blue-500 hover:underline">Create Post</Link>
        </>
    )
}