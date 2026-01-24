export type ActionResponse<D, E> = {
    success: boolean
    errors: E
    data: D
}