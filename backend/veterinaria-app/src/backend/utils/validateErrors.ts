import { ValidationError } from "class-validator";
import { ResponseDTO } from "../../application/dtos/response/responseDTO";

export function handleValidationErrors(errors: ValidationError[], responseDTO: ResponseDTO<any>): void {
    responseDTO.addMessage('Error de validaciones');
    errors.forEach(error => {
        if (error.constraints) {
            Object.values(error.constraints).forEach(message => {
                responseDTO.addMessage(message);
            });
        }
    });
}