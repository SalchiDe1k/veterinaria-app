export interface Response<T> {
    data?: T,
    message: Array<string>,
    code: number
}