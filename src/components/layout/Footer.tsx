export const MainFooter = () => {

    return (
        <div className=" w-full bg-slate-700 text-white py-4">
            <div className=" container mx-auto px-6">
                <div className=" flex flex-col gap-4 md:flex-row justify-between items-center">
                    <div className=""></div>
                    <p>@<a href="https://abdulazeezsalami.vercel.app/" target="_blank" className=" hover:underline">aziz</a> © {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}

export const DashboardFooter = () => {

    return (
        <div className=" fixed bottom-2 right-6 py-1 px-3 rounded bg-white/20 backdrop-blur text-sm font-semibold text-gray-700 dark:text-gray-300">
            Developed by <a href="https://abdulazeezsalami.vercel.app/" target="_blank" className=" hover:underline">Aziz</a>
        </div>
    )
}