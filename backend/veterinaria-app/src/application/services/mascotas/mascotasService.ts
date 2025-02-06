import { StatusCodes } from "http-status-codes";
import { IMascota } from "../../../domain/models/mascota/IMascota";
import { ResponseException } from "../../../infrastructure/exceptions/responseException";
import { MascotaRepository } from "../../../infrastructure/repositories/mascota/MascotaRepository";
import { PropietarioRepository } from "../../../infrastructure/repositories/propietario/propietarioRepository";
import { MascotaCreateDTO } from "../../dtos/mascotas/mascotaCreateDTO";
import { MascotaDTO } from "../../dtos/mascotas/mascotaDTO";
import { Paginacion } from "../../../domain/models/paginacion/pagination";
import { IMascotaDocument } from "../../../infrastructure/database/models/mascota/mascotaModel";

export class MascotaService {
  private _repositoryMascota = new MascotaRepository();
  private _repositoryPropietario = new PropietarioRepository();

  async getAll(
    page: number,
    pageSize: number,
    protocol: string,
    host: string,
    path: string
  ): Promise<Paginacion<MascotaDTO>> {
    const mascotas = await this._repositoryMascota.paginacion(
      page,
      pageSize,
      protocol,
      host,
      path
    );

    return {
      ...mascotas,
      data: mascotas.data.map((mascota) => new MascotaDTO(mascota)),
    };
    // return mascotas.map((mascota) => new MascotaDTO(mascota));
  }

  async create(mascotaCreateDTO: MascotaCreateDTO) {
    const { propietarioId } = mascotaCreateDTO;

    if (!(await this._repositoryPropietario.existById(propietarioId))) {
      throw new ResponseException(
        StatusCodes.NOT_FOUND,
        [`El propietario no existe.`],
        null
      );
    }

    const mascota = await this._repositoryMascota.create(
      mascotaCreateDTO.toObject()
    );

    return new MascotaDTO(mascota);
  }

  async searchByPropietario(propietarioId: string): Promise<MascotaDTO[]> {
    const mascotas = await this._repositoryMascota.searchByIdPropietario(propietarioId);

    return mascotas.map((mascota: unknown) => new MascotaDTO(mascota as IMascotaDocument));
  }
}
