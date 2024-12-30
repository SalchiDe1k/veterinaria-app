import { ResponseDTO } from "../../application/dtos/response/responseDTO";

export class ResponseException<T> extends Error implements ResponseDTO<T> {

    public code: number;
    public data?: T;
    public messages: string[];

    addMessage(message: string): void {
        this.messages.push(message);
    }

    setData(data: T): void {
        this.data = data;
    }

    setCode(code: number): void {
        this.code = code;
    }
    
    constructor(code: number, messages: string[], data?: T) {
        super(messages.join(", "));
        const response = new ResponseDTO<T>(code, data, messages);
        this.code = response.code;
        this.data = response.data ?? null; 
        this.messages = response.messages;
    }
}
