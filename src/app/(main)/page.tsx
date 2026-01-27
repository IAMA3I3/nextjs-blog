import PageHeader from "@/components/layout/PageHeader";
import RenderPosts from "@/components/post/RenderPosts";
import { LoadingText } from "@/components/ui/Loading";
import { Suspense } from "react";

export const revalidate = 60

export default async function Home() {

  return (
    <div className=" py-12">
      <div className=" container px-6 mx-auto space-y-12">
        <PageHeader title="Bloggers Blog" subtitle="Welcome to the coolest blog site 😎" />
        <Suspense fallback={<LoadingText text="Loading Posts" />}>
          <RenderPosts />
        </Suspense>
      </div>
    </div>
  );
}
