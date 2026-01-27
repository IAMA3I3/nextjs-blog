import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";

export default function NotFound() {

    return (
        <div className=" flex-1 flex flex-col justify-center items-center">
            <p className=' text-2xl text-gray-600'>Post Not Found</p>
            <Link href={'/'} className=" inline-block mt-8">
                <Button variant="secondary" text="Go To Home" icon={GoHomeFill} iconPosition="end" />
            </Link>
        </div>
    )
}