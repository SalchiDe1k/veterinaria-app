import { MascotaCreateDTO } from "@/application/dtos";
import { MascotaModel } from "@/domain/models";
import { mascotaRepository } from "@/infrastructure/repositories";

export const mascotaService = {
  async create(mascota: MascotaModel) {
    const mascotaCreateDTO = new MascotaCreateDTO(mascota);

    const response = await mascotaRepository.create(
      mascotaCreateDTO.toObject()
    );

    return response;
  },

  async getByPropietarioId(propietarioId: string) {
    const response = await mascotaRepository.getByPropietariId(propietarioId);
    return response.data;
  },

  async getMascotas() {
    const response = await mascotaRepository.getMascotas();
    return response.data;
  }
};
