export const LoadingSpinner = () => {
    return (
        <div className=" w-full h-full flex justify-center items-center">
            <div className=" w-15 aspect-square border-x-2 border-gray-400 animate-spin rounded-full"></div>
        </div>
    )
}

type LoadingTextProps = {
    text: string
}

export const LoadingText = ({ text }: LoadingTextProps) => {

    return (
        <div className=" flex-1 w-full h-full justify-center items-center">
            <p className=" italic text-xl text-center text-gray-500 animate-pulse">{text} ...</p>
        </div>
    )
}