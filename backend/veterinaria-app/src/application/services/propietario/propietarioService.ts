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
    const { numero_identificacion, correo } = propietarioCreateDTO;

    // Validar existencia de número de identificación y correo
    const [identificacionExiste, correoExiste] = await Promise.all([
      this._propietarioRepository.existByNumeroIdentificacion(
        numero_identificacion
      ),
      this._propietarioRepository.existByCorreo(correo),
    ]);

    if (identificacionExiste || correoExiste) {
      const errores = [];
      if (identificacionExiste)
        errores.push("El número de identificación se encuentra registrado");
      if (correoExiste)
        errores.push("El correo electrónico se encuentra registrado");

      throw new ResponseException<IPropietario>(
        StatusCodes.CONFLICT,
        errores,
        propietarioCreateDTO.toObject()
      );
    }

    // Crear propietario
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
        (propietario) => new PropietarioDTO(propietario?? null)
      ),
    };
  }

  async getById(id: string): Promise<PropietarioDTO> {
    const propietario = await this._propietarioRepository.getById(id);
    return new PropietarioDTO(propietario);
  }

  async update(
    id: string,
    data: PropietarioCreateDTO
  ): Promise<PropietarioDTO> {
    const propietarioUpdate = await this._propietarioRepository.update(
      id,
      data.toObject()
    );

    const propietarioDTO = new PropietarioDTO(propietarioUpdate);

    return propietarioDTO;
  }

  async search(query: string): Promise<PropietarioDTO[]> {
    const propietarios = await this._propietarioRepository.search(query);

    return propietarios.map((propietario) => new PropietarioDTO(propietario));
  }
}
