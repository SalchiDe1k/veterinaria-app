export interface Response<T> {
    data?: T,
    messages: Array<string>,
    code: number
}