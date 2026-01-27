import { PageCard } from "@/components/container/Card";
import PageHeader from "@/components/layout/PageHeader";

export default function About() {

    return (
        <div className=" py-12">
            <div className=" container px-6 mx-auto space-y-12">
                <PageHeader title="About" subtitle="What you need to know about Bloggers Blog" currentPage="About" />
                <PageCard centerAlign>
                    <h3 className="text-xl font-semibold mb-2">Bloggers Blog</h3>

                    <p className="text-muted leading-relaxed">
                        Bloggers Blog is a minimal, full-stack blogging platform built as a hands-on
                        learning project and a practical demonstration of modern web development
                        skills.
                    </p>

                    <p className="text-muted leading-relaxed mt-2">
                        The goal of this project is simple: to explore real-world full-stack
                        application development while building something functional, clean, and
                        user-focused.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold mb-2">
                        Why Bloggers Blog Exists
                    </h3>

                    <p className="text-muted leading-relaxed">
                        As a frontend developer with a strong background in modern UI development,
                        this project was created to go beyond interfaces and dive deeper into how
                        full-stack applications actually work — from authentication to database
                        design and server-side logic.
                    </p>

                    <p className="text-muted leading-relaxed mt-2">
                        Instead of building isolated demos, Bloggers Blog focuses on core, real-world
                        features you’d expect in a production application:
                    </p>

                    <ul className="list-disc pl-6 mt-3 space-y-1 text-muted">
                        <li>User authentication</li>
                        <li>Secure session handling</li>
                        <li>Full CRUD operations for blog posts</li>
                        <li>Server-side rendering and data fetching</li>
                        <li>Public access to published content</li>
                        <li>Clean, responsive, and accessible UI</li>
                    </ul>

                    <p className="text-muted leading-relaxed mt-3">
                        This makes the project a solid minimum viable product (MVP) and a strong
                        foundation for future expansion.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold mb-2">
                        What You Can Do on Bloggers Blog
                    </h3>

                    <p className="text-muted leading-relaxed">
                        Bloggers Blog allows users to freely interact with the platform in a simple
                        and intuitive way:
                    </p>

                    <ul className="list-disc pl-6 mt-3 space-y-1 text-muted">
                        <li>Create an account and log in securely</li>
                        <li>Create and publish blog posts</li>
                        <li>View blog posts created by other users</li>
                        <li>Access public content without authentication</li>
                    </ul>

                    <p className="text-muted leading-relaxed mt-3">
                        While reading posts is open to everyone, creating content requires
                        authentication to ensure basic security and ownership.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold mb-2">
                        Built With Modern Tools
                    </h3>

                    <p className="text-muted leading-relaxed">
                        Bloggers Blog is built using a modern, scalable technology stack, including
                        Next.js, TypeScript, MongoDB, and Tailwind CSS. The focus was not just on
                        functionality, but also on clean architecture, maintainable code, and best
                        practices.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold mb-2">
                        A Learning Project in Progress
                    </h3>

                    <p className="text-muted leading-relaxed">
                        This website is a practice project and an ongoing learning experience. While
                        it is fully functional, it is not intended to be a large-scale production
                        platform.
                    </p>

                    <p className="text-muted leading-relaxed mt-2">
                        A more advanced version may be developed in the future, with improvements
                        such as enhanced features, better performance, and expanded functionality.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold mb-2">
                        Content Disclaimer
                    </h3>

                    <p className="text-muted leading-relaxed">
                        Bloggers Blog is an open platform that allows users to create and publish
                        content freely. The views, opinions, and statements expressed in user-created
                        posts belong solely to their respective authors.
                    </p>

                    <p className="text-muted leading-relaxed mt-2">
                        The developer of Bloggers Blog does not review, endorse, or take responsibility
                        for the accuracy, legality, or appropriateness of content posted by users.
                        Users are solely responsible for the content they publish on the platform.
                    </p>

                    <p className="text-muted leading-relaxed mt-2">
                        This project exists primarily as a learning and demonstration platform, and
                        content moderation is intentionally minimal.
                    </p>

                </PageCard>

            </div>
        </div>
    )
}