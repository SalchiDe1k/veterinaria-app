import { IMascota } from "../../../domain/models/mascota/IMascota";
import { MascotaRepository } from "../../../infrastructure/repositories/mascota/MascotaRepository";
import { MascotaCreateDTO } from "../../dtos/mascotas/mascotaCreateDTO";
import { MascotaDTO } from "../../dtos/mascotas/mascotaDTO";

export class MascotaService {
    private repository = new MascotaRepository();

    async getAll(): Promise<MascotaDTO[]> {
        const mascotas = await this.repository.getAll();
        return mascotas.map(mascota => new MascotaDTO(mascota));
    }

    async create(dto: MascotaCreateDTO): Promise<MascotaDTO> {
        const mascota = await this.repository.create(dto.toObject());
        return new MascotaDTO(mascota);
    }
}
