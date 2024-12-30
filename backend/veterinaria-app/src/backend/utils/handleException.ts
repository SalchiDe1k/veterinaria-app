import { Response } from "express";
import { ResponseException } from "../../infrastructure/exceptions/responseException";
import { StatusCodes } from "http-status-codes";

export function handleException(error: unknown, res: Response): void {
    if (error instanceof ResponseException) {
        res.status(error.code).json(error);
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor', error });
    }
}