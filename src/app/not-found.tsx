import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";

export default function NotFound() {

    return (
        <main className=" flex flex-col min-h-screen">
            <Navbar />
            <div className=" flex-1 flex flex-col justify-center items-center">
                <h1 className=' text-6xl md:text-9xl font-thin text-gray-600'>404</h1>
                <p className=' text-2xl text-gray-600'>Page Not Found</p>
                <Link href={'/'} className=" inline-block mt-8">
                    <Button variant="secondary" text="Go To Home" icon={GoHomeFill} iconPosition="end" />
                </Link>
            </div>
        </main>
    )
}