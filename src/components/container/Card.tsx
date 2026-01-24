type PageCardProps = {
    children: React.ReactNode
    fullWidth?: boolean
    fullHeight?: boolean
}

export const PageCard = ({ children, fullWidth = false, fullHeight = false }: PageCardProps) => {

    return (
        <div
            className={`
                ${fullWidth ? "" : " max-w-150"}
                ${fullHeight ? " h-full" : ""}
                w-full p-6 rounded-lg shadow-lg bg-white border-2 border-gray-100
            `}
        >
            <div className=" w-full h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}