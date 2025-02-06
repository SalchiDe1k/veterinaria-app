import type { Request, Response } from "express";
import { MascotaService } from "../../../application/services/mascotas/mascotasService";
import { MascotaCreateDTO } from "../../../application/dtos/mascotas/mascotaCreateDTO";
import { StatusCodes as code, StatusCodes } from "http-status-codes";
import { ResponseDTO } from "../../../application/dtos/response/responseDTO";
import { validate } from "class-validator";
import { handleValidationErrors } from "../../utils/validateErrors";
import { handleException } from "../../utils/handleException";
import { MascotaDTO } from "../../../application/dtos/mascotas/mascotaDTO";

const mascotaService = new MascotaService();

export const mascotaController = {
  async getAll(req: Request, res: Response) {
    try {
      const responseDTO = new ResponseDTO<any>(code.OK);
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const protocol = req.protocol;
      const host = req.get("host")!;
      const path = `${req.baseUrl}${req.path}`;

      const mascotas = await mascotaService.getAll(
        page,
        pageSize,
        protocol,
        host,
        path
      );
      responseDTO.addMessage("Mascotas encontradas");
      responseDTO.setData(mascotas);

      res.status(responseDTO.code).json(responseDTO);
      return;
    } catch (error) {
      handleException(error, res);
      return;
    }
  },

  async create(req: Request, res: Response) {
    try {
      const responseDTO = new ResponseDTO<unknown>(code.BAD_REQUEST, null);
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

      responseDTO.addMessage("Mascota registrada exitosamente");
      responseDTO.setCode(code.CREATED);
      responseDTO.setData(nuevaMascota);

      res.status(responseDTO.code).json(responseDTO);

      return;
    } catch (error) {
      handleException(error, res);
      return;
    }
  },

  async searchByPropietarioID(req: Request, res: Response) {
    try {
      let responseDTO = new ResponseDTO<MascotaDTO[]>(
        StatusCodes.BAD_REQUEST,
        [],
        ["El parámetro de búsqueda no puede estar vacío."]
      );

      const { query } = req.params as { query: string };

      // if (!query) {
      //   res.status(responseDTO.code).json(responseDTO);
      //   return;
      // }

      responseDTO = new ResponseDTO<MascotaDTO[]>(StatusCodes.OK);

      const mascotas = await mascotaService.searchByPropietario(query);
      responseDTO.addMessage("Propietarios encontrados");
      responseDTO.setData(mascotas);

      res.status(responseDTO.code).json(responseDTO);
      return;
    } catch (error) {
      handleException(error, res);
    }
  },
};
