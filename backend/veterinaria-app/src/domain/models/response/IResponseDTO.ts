export interface IResponseDTO<T> {
    data?: T,
    messages: string[],
    code: number
}