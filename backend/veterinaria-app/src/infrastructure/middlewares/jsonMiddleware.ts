import { NextFunction, Request, Response } from "express";
import { ResponseDTO } from "../../application/dtos/response/responseDTO";
import { StatusCodes } from "http-status-codes";

interface SyntaxErrorWithStatus extends SyntaxError {
    status?: number; // Hace que la propiedad 'status' sea opcional
    body?: any;      // Agrega la propiedad 'body'
}

export function JsonMiddleware(err: SyntaxErrorWithStatus, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        const responseDTO = new ResponseDTO(StatusCodes.BAD_REQUEST);
        responseDTO.addMessage("JSON equivocado. Verifica el formato y los valores enviados.")
        res.status(responseDTO.code).json(responseDTO);
        return;
    }
    next();
}
