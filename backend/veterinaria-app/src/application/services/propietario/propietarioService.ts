import { StatusCodes } from "http-status-codes";
import { ResponseException } from "../../../infrastructure/exceptions/responseException";
import { PropietarioRepository } from "../../../infrastructure/repositories/propietario/propietarioRepository";
import { PropietarioCreateDTO } from "../../dtos/propietario/propietarioCreateDTO";
import { IPropietario } from "../../../domain/models/propietario/IPropietario";
import { PropietarioDTO } from "../../dtos/propietario/propietarioDTO";

export class PropietarioService {
  private _propietarioRepository = new PropietarioRepository();

  async create(
    propietarioCreateDTO: PropietarioCreateDTO
  ): Promise<PropietarioDTO> {
    const { numero_identificacion } = propietarioCreateDTO;

    if (
      await this._propietarioRepository.existByNumeroIdentificacion(
        numero_identificacion
      )
    ) {
      throw new ResponseException<IPropietario>(
        StatusCodes.CONFLICT,
        ["El número de identificación se encuentra registrado"],
        propietarioCreateDTO.toObject()
      );
    }

    const propietario = await this._propietarioRepository.create(
      propietarioCreateDTO.toObject()
    );

    return new PropietarioDTO(propietario);
  }

  async getAll(
    page: number,
    pageSize: number,
    protocol: string,
    host: string,
    path: string
  ) {
    const propietarios = await this._propietarioRepository.paginacion(
      page,
      pageSize,
      protocol,
      host,
      path
    );

    return {
      ...propietarios,
      data: propietarios.data.map(
        (propietario) => new PropietarioDTO(propietario)
      ),
    };
  }
}
