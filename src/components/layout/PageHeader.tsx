import Link from "next/link"
import { GoHomeFill } from "react-icons/go";

type PageHeaderProps = {
    title?: string
    subtitle?: string
    currentPage?: string
}

export default function PageHeader({ title, subtitle, currentPage }: PageHeaderProps) {
    return (
        <div className=" w-full p-8 rounded-xl shadow-lg bg-linear-60 from-black/20 dark:from-white/20 via-black/10 dark:via-white/30 to-black/20 dark:to-white/20">
            <h1 className=" text-2xl md:text-4xl text-center">{title}</h1>
            <p className=" text-muted text-center mt-2">{subtitle}</p>
            {
                currentPage && (
                    <div className=" mt-4 flex items-center justify-center gap-2">
                        <Link href={'/'} className=" flex items-center gap-1 text-muted font-semibold hover:text-primary">
                            <span><GoHomeFill /></span>
                            <span>Home</span>
                        </Link>
                        <span>/</span>
                        <p className=" font-semibold">{currentPage}</p>
                    </div>
                )
            }
        </div>
    )
}