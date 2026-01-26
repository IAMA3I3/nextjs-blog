"use client"

import { useStateContext } from "@/context/StateContext"
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

export default function Topbar() {

    const { isSideBarOpened, toggleSideBar } = useStateContext()

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
                    <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        <FaRegBell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <button className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold text-sm text-white">
                            UN
                        </div>
                        <FaAngleDown className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    )
}