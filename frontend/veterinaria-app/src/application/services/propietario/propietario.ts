import {
  PropietarioCreateDTO,
  PropietarioResponseDTO,
} from "@/application/dtos";
import { Paginacion } from "@/domain/interfaces/api/response/paginacion/paginacion";
import { Propietario } from "@/domain/models/propietario/propietario";
import { propietarioRepository } from "@/infrastructure/repositories";
// import { get } from "http";

export const propietarioService = {
  async getAll(url?: string): Promise<Paginacion<PropietarioResponseDTO>> {
    const response = await propietarioRepository.getAll(url);
    const datos = response.data.data.map(
      (data) => new PropietarioResponseDTO(data)
    );
    response.data.links = response.data.links.slice(1, -1);
    return { ...response.data, data: datos };
  },

  async create(data: Propietario) {
    const propietarioCreateDTO = new PropietarioCreateDTO(data);

    const response = await propietarioRepository.create(
      propietarioCreateDTO.toObject()
    );

    return response;
  },

  async getById(id: string): Promise<PropietarioResponseDTO> {
    const response = await propietarioRepository.getById(id);
    return new PropietarioResponseDTO(response.data);
  },

  async update(id: string, data: Propietario) {
    const propietarioCreateDTO = new PropietarioCreateDTO(data);
    const response = propietarioRepository.update(id, propietarioCreateDTO.toObject());
    return (await response).code === 200;
  },

  async search (query?: string): Promise<PropietarioResponseDTO[]> {
    const response = await propietarioRepository.search(query);
    return response.data.map((data) => new PropietarioResponseDTO(data));
  }
};
