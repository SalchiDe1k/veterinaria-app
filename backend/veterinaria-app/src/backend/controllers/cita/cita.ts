import { Request, Response } from "express";
import { handleException } from "../../utils/handleException";
import { ResponseDTO } from "../../../application/dtos/response/responseDTO";
import { StatusCodes } from "http-status-codes";
import { CitaCreateDTO } from "../../../application/dtos/citas/citaCreateDTO";
import { validate } from "class-validator";
import { handleValidationErrors } from "../../utils/validateErrors";
import { CitaService } from "../../../application/services/citas/citas";
import { CitaUpdateDTO } from "../../../application/dtos/citas/citaUpdateDTO";

const citaService = new CitaService();


export const CitaController = {
    async create(req: Request, res: Response) {
        try {
            const responseDTO = new ResponseDTO<any>(StatusCodes.OK);
            const citaCreateDTO = new CitaCreateDTO(req.body);
            const errors = await validate(citaCreateDTO);

            if (errors.length > 0) {
                handleValidationErrors(errors, responseDTO);
                res.status(responseDTO.code).json(responseDTO);
                return;
            }

            const response = await citaService.createCita(citaCreateDTO);


            responseDTO.addMessage("Cita registrada exitosamente");
            responseDTO.setCode(StatusCodes.CREATED);
            responseDTO.setData(response);

            res.status(responseDTO.code).json(responseDTO);
        } catch (error) {
            handleException(error, res);
            return;
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const responseDTO = new ResponseDTO<any>(StatusCodes.OK);
            const response = await citaService.getFechas();

            responseDTO.addMessage("Cita Obtenidas exitosamente");
            responseDTO.setCode(StatusCodes.CREATED);
            responseDTO.setData(response);

            res.status(responseDTO.code).json(responseDTO);
            return;
        } catch (error) {
            handleException(error, res);
            return;
        }
    },
    async update(req: Request, res: Response) {
        try {
            const responseDTO = new ResponseDTO<unknown>(
                StatusCodes.OK,
                null
            );
            const citaCreateDTO = new CitaUpdateDTO(req.body);
            const errors = await validate(citaCreateDTO);

            if (errors.length > 0) {
                handleValidationErrors(errors, responseDTO);
                res.status(responseDTO.code).json(responseDTO);
                return;
            }

            const { id } = req.params;
            const propietario = await citaService.updateCita(id, citaCreateDTO);
            responseDTO.setCode(StatusCodes.OK);
            responseDTO.addMessage("Cita Actualizada");
            responseDTO.setData(propietario);

            res.status(responseDTO.code).json(responseDTO);
            return;
        } catch (error) {
            handleException(error, res);
        }
    },
}