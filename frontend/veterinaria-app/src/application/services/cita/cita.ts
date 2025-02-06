import { CitaCreateDTO } from "@/application/dtos/cita/request/citaCreateDTO";
import { CitaUpdateDTO } from "@/application/dtos/cita/request/citaUpdateDTO";
import { citaRepository } from "@/infrastructure/repositories/cita/cita";

export const citaService = {
    async create(cita: CitaCreateDTO) {
        const response = await citaRepository.create(cita.toObjectRequest());
        return response;
    },

    async get() {
        const response = await citaRepository.get();
        return response.data;
    },

    async update(id: string, cita: CitaUpdateDTO) {
        const response = await citaRepository.update(id, cita.toObject());
        return response;
    }


};
