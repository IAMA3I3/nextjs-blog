"use client"

import { useStateContext } from "@/context/StateContext"
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaAngleDown, FaUser } from "react-icons/fa6";
import { logoutAction } from "@/actions/auth";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SessionPayload } from "@/lib/sessions";

type TopbarProps = {
    authUser: SessionPayload
}

export default function Topbar({ authUser }: TopbarProps) {

    const dropDownRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const { isSideBarOpened, toggleSideBar } = useStateContext()
    const [dropedMenu, setDropedMenu] = useState(false)

    const logout = async () => {
        await logoutAction()
        toast.success("Logged out")
        redirect("/")
    }

    const toggleDropMenu = () => {
        setDropedMenu(prev => !prev)
    }

    const closeDropMenu = () => {
        setDropedMenu(false)
    }

    useEffect(() => {
        function handleClickOutside(event: globalThis.MouseEvent) {
            if (!dropedMenu) return

            const target = event.target as Node

            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                closeDropMenu()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropedMenu])


    return (
        <header className="bg-white dark:bg-slate-700 shadow-sm z-10">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSideBar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        {isSideBarOpened ? <CgClose className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>

                    <div className="hidden md:flex items-center bg-gray-100 text-gray-500 rounded-lg px-4 py-2 w-96">
                        <IoSearch className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none w-full text-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className=" hidden md:inline-block relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        <FaRegBell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className=" relative">
                        <button ref={buttonRef} onClick={toggleDropMenu} className={`${dropedMenu ? " bg-gray-100 dark:bg-slate-800" : " hover:bg-gray-100 dark:hover:bg-slate-800"} flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors`}>
                            <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold text-sm text-white">
                                <FaUser />
                            </div>
                            <FaAngleDown className={`${dropedMenu ? " rotate-180" : " rotate-0"} transition-all duration-500 w-4 h-4`} />
                        </button>
                        <div ref={dropDownRef} className={`${dropedMenu ? " opacity-100 translate-y-0 visible" : " opacity-0 -translate-y-5 invisible"} transition-all duration-500 absolute right-0 mt-4 min-w-45 bg-white rounded-lg border-2 border-gray-100 shadow-lg p-2`}>
                            <div className=" w-45">
                                <p className=" text-sm truncate">{authUser.email}</p>
                            </div>
                            <button onClick={logout} className=" w-full py-2 px-6 bg-gray-200 text-xs font-semibold mt-2 rounded cursor-pointer hover:bg-red-300 hover:text-red-700">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}