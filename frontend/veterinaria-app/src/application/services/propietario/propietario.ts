import { PropietarioCreateDTO } from "@/application/dtos";
import { Propietario } from "@/domain/models/propietario/propietario";
import { propietarioRepository } from "@/infrastructure/repositories";

export const propietarioService = {
  async getAll(url?: string) {
    const response = await propietarioRepository.getAll(url);
    response.data.links = response.data.links.slice(1, -1);
    return response.data;
  },

  async create(data: Propietario) {
    const propietarioCreateDTO = new PropietarioCreateDTO(data);

    const response = propietarioRepository.create(
      propietarioCreateDTO.toObject()
    );

    return (await response).code === 201;
  },
};
