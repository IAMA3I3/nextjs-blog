"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../ui/Logo";
import { redirect, usePathname } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { SessionPayload } from "@/lib/sessions";
import { logoutAction } from "@/actions/auth";
import toast from "react-hot-toast";

type NavbarProps = {
    authUser: SessionPayload | null
}

const generalLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" }
]

const guestLinks = [
    ...generalLinks,
    { name: "Sign In", href: "/sign-in" },
    { name: "Sign Up", href: "/sign-up" }
]

const authLinks = [
    ...generalLinks,
    { name: "Dashboard", href: "/dashboard" }
]

export default function Navbar({ authUser }: NavbarProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = authUser ? authLinks : guestLinks

    const logout = () => {
        logoutAction()
        toast.success("Logged out")
        redirect("/")
    }

    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);

        return () => window.removeEventListener('resize', setVH);
    }, [])

    return (
        <>
            <nav className=" w-full py-4 bg-slate-900/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
                <div className=" container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo size="small" />
                        <span className="font-semibold md:text-lg text-white">Bloggers Blog</span>
                    </Link>
                    <div className=" hidden items-center gap-6 md:flex">
                        {
                            navLinks.map(link => {
                                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`${isActive ? " text-white" : "text-gray-300 hover:text-white"} text-sm font-semibold transition-colors`}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })
                        }
                        {authUser && <button onClick={logout} className=" text-gray-300 cursor-pointer hover:text-white text-sm font-semibold transition-colors">Logout</button>}
                    </div>
                    <button onClick={() => setIsOpen(true)} className="md:hidden text-white text-2xl">
                        <HiMenuAlt1 />
                    </button>
                </div>
            </nav>
            <div onClick={() => setIsOpen(false)} className={`${isOpen ? ' visible opacity-100' : ' invisible opacity-0'} transition-all duration-500 lg:hidden z-50 fixed top-0 left-0 w-screen h-screen bg-black/20 backdrop-blur-sm`}></div>
            <div className={`${isOpen ? ' translate-x-0 shadow-lg' : ' -translate-x-62.5'} transition-all duration-500 lg:hidden z-50 fixed top-0 left-0 h-[calc(var(--vh,1vh)*100)] w-62.5 bg-white/90 backdrop-blur shadow-black/50 flex flex-col`}>
                <div className=" h-20"></div>
                <div className=" flex-1 space-y-4 overflow-y-auto scrollbar small-scrollbar">
                    {
                        navLinks.map(link => {
                            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                            return (
                                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className={`${isActive ? ' bg-primary/20 text-primary' : ' text-primary hover:bg-primary/20'} flex items-center font-semibold py-2 px-6`}>{link.name}</Link>
                            )
                        })
                    }
                    {authUser && <button onClick={logout} className=" w-full cursor-pointer text-primary hover:bg-primary/20 flex items-center font-semibold py-2 px-6">Logout</button>}
                </div>
            </div>
        </>
    )
}