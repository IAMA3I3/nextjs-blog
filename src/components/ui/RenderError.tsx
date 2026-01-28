export const RenderError = ({ err }: { err: unknown }) => {
    return (
        <div className=" flex-1 justify-center items-center">
            <p className=" text-center text-red-400">{err instanceof Error ? err.message : "An Error Occured"}</p>
        </div>
    )
}