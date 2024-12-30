import { IResponseDTO } from "../../../domain/models/response/IResponseDTO";

export class ResponseDTO<T> implements IResponseDTO<T> {
    messages: string[] = [];
    data?: T;
    code: number = 0;

    constructor();
    constructor(code: number);
    constructor(code: number, data: T);
    constructor(code: number, data: T, messages: string[]);
    constructor(code?: number, data?: T, messages?: string[]) {
        if (code) this.setCode(code);
        if (data) this.setData(data);
        if (messages) this.messages = messages;
    }

    addMessage(message: string): void {
        this.messages.push(message);
    }

    setData(data: T): void {
        this.data = data;
    }

    setCode(code: number): void {
        this.code = code;
    }
}
