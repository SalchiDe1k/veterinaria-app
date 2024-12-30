import type { Request, Response } from "express";
import { MascotaService } from "../../../application/services/mascotas/mascotasService";
import { MascotaCreateDTO } from "../../../application/dtos/mascotas/mascotaCreateDTO";
import { StatusCodes as code } from "http-status-codes";
import { ResponseDTO } from "../../../application/dtos/response/responseDTO";
import { validate } from "class-validator";
import { handleValidationErrors } from "../../utils/validateErrors";
import { handleException } from "../../utils/handleException";
import { MascotaDTO } from "../../../application/dtos/mascotas/mascotaDTO";

const mascotaService = new MascotaService();

export const mascotaController = {
    async getAll(req: Request, res: Response) {
        try {
            const responseDTO = new ResponseDTO<MascotaDTO[]>(code.OK);

            const mascotas = await mascotaService.getAll();
            responseDTO.addMessage('Mascotas encontradas');
            responseDTO.setData(mascotas);

            res.status(responseDTO.code).json(responseDTO);
            return;
        } catch (error) {
            handleException(error, res)
            return;
        }
    },

    async create(req: Request, res: Response) {
        try {

            const responseDTO = new ResponseDTO<MascotaDTO>(code.BAD_REQUEST, null);
            const mascotaDTO = new MascotaCreateDTO(req.body);

            // Validar el DTO
            const errors = await validate(mascotaDTO);
            if (errors.length > 0) {
                handleValidationErrors(errors, responseDTO);
                res.status(responseDTO.code).json(responseDTO);
                return;
            }

            // Crear la mascota si no hay errores
            const nuevaMascota = await mascotaService.create(mascotaDTO);

            responseDTO.addMessage('Mascota registrada exitosamente');
            responseDTO.setCode(code.CREATED);
            responseDTO.setData(nuevaMascota);

            res.status(responseDTO.code).json(responseDTO);

            return;

        } catch (error) {
            handleException(error, res)
            return;
        }
    },
};