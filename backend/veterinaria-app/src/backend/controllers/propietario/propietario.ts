import { Request, Response } from "express";
import { handleException } from "../../utils/handleException";
import { PropietarioService } from "../../../application/services/propietario/propietarioService";
import { ResponseDTO } from "../../../application/dtos/response/responseDTO";
import { PropietarioCreateDTO } from "../../../application/dtos/propietario/propietarioCreateDTO";
import { handleValidationErrors } from "../../utils/validateErrors";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { PropietarioDTO } from "../../../application/dtos/propietario/propietarioDTO";
import { Paginacion } from "../../../domain/models/paginacion/pagination";
import { IPropietario } from "../../../domain/models/propietario/IPropietario";

const propietarioService = new PropietarioService();

export const propietarioController = {
  async getAll(req: Request, res: Response) {
    try {
      const responseDTO = new ResponseDTO<Paginacion<PropietarioDTO>>(
        StatusCodes.OK
      );
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const protocol = req.protocol;
      const host = req.get("host")!;
      const path = `${req.baseUrl}${req.path}`;

      const propietarios = await propietarioService.getAll(
        page,
        pageSize,
        protocol,
        host,
        path
      );

      responseDTO.addMessage("Propietarios encontrados");
      responseDTO.setData(propietarios);

      res.status(responseDTO.code).json(responseDTO);
      return;
    } catch (error) {
      handleException(error, res);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const responseDTO = new ResponseDTO<PropietarioDTO>(
        StatusCodes.BAD_REQUEST,
        null
      );
      const mascotaDTO = new PropietarioCreateDTO(req.body);

      // Validar el DTO
      const errors = await validate(mascotaDTO);
      if (errors.length > 0) {
        handleValidationErrors(errors, responseDTO);
        res.status(responseDTO.code).json(responseDTO);
        return;
      }

      // Crear la mascota si no hay errores
      const nuevoPropietario = await propietarioService.create(mascotaDTO);
      responseDTO.setCode(StatusCodes.CREATED);
      responseDTO.addMessage("Propietario Registrado");
      responseDTO.setData(nuevoPropietario);

      res.status(responseDTO.code).json(responseDTO);
      return;
    } catch (error) {
      handleException(error, res);
    }
  },
};
