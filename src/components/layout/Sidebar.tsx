"use client"

import { LuLayoutDashboard } from "react-icons/lu"
import { FaBlog } from "react-icons/fa6"
import { useStateContext } from "@/context/StateContext"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navLinks = [
    { title: "Overview", href: "/dashboard", icon: LuLayoutDashboard },
    { title: "Posts", href: "/my-posts", icon: FaBlog }
]

export default function Sidebar() {
    const { isSideBarOpened, toggleSideBar, closeSideBar } = useStateContext()
    const pathname = usePathname()

    return (
        <>
            {
                isSideBarOpened && (
                    <div
                        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                        onClick={toggleSideBar}
                    ></div>
                )
            }
            <aside className={` bg-gray-700 dark:bg-gray-900 text-white transition-all duration-300 ease-in-out fixed lg:relative h-full z-50 ${isSideBarOpened ? 'w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'} overflow-hidden shrink-0`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <Link href={"/"} className="flex items-center justify-between p-4 border-b border-gray-800">
                        <div className={`flex w-full items-center space-x-3 ${!isSideBarOpened && 'lg:justify-center'}`}>
                            <div className="w-8 h-8 flex-none bg-blue-600 rounded-lg flex items-center justify-center font-bold">
                                B
                            </div>
                            {isSideBarOpened && <span className="text-xl font-semibold truncate">Bloggers Blog</span>}
                        </div>
                    </Link>
                    <nav className="flex-1 p-4 space-y-2">
                        {
                            navLinks.map(navLink => {
                                const Icon = navLink.icon
                                const isActive = pathname === navLink.href || (pathname.startsWith(navLink.href) && navLink.href !== "/")
                                return (
                                    <Link
                                        key={navLink.title}
                                        href={navLink.href}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) {
                                                closeSideBar();
                                            }
                                        }}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'} ${!isSideBarOpened && 'lg:justify-center'}`}
                                    >
                                        <Icon className="w-5 h-5 shrink-0" />
                                        {isSideBarOpened && <span>{navLink.title}</span>}
                                    </Link>
                                )
                            })
                        }
                    </nav>
                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-800">
                        <div className={`flex items-center space-x-3 ${!isSideBarOpened && 'lg:justify-center'}`}>
                            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold">
                                UN
                            </div>
                            {isSideBarOpened && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">User Name</p>
                                    <p className="text-xs text-gray-400 truncate">username@gmail.com</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}