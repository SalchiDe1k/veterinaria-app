import { StatusCodes } from "http-status-codes";
import { ResponseException } from "../../../infrastructure/exceptions/responseException";
import { MascotaRepository } from "../../../infrastructure/repositories/mascota/MascotaRepository";
import { PropietarioRepository } from "../../../infrastructure/repositories/propietario/propietarioRepository";
import { CitaCreateDTO } from "../../dtos/citas/citaCreateDTO";
import { CitaRepository } from "../../../infrastructure/repositories/cita/CitaRepository";
import { CitaDTO } from "../../dtos/citas/citaDTO";
import { CitaUpdateDTO } from "../../dtos/citas/citaUpdateDTO";

export class CitaService {
    private _repositoryMascota = new MascotaRepository();
    private _repositoryPropietario = new PropietarioRepository();
    private _repositoryCita = new CitaRepository();

    async createCita(citaCreateDTO: CitaCreateDTO) {
        const { mascotaID, propietarioID, inicioCita } = citaCreateDTO;

        // Validar existencia de la mascota
        const mascotaExiste = await this._repositoryMascota.existById(mascotaID);
        if (!mascotaExiste) {
            throw new ResponseException(
                StatusCodes.NOT_FOUND,
                [`La mascota con ID ${mascotaID} no existe.`],
                null
            );
        }

        // Validar existencia del propietario
        const propietarioExiste = await this._repositoryPropietario.existById(propietarioID);
        if (!propietarioExiste) {
            throw new ResponseException(
                StatusCodes.NOT_FOUND,
                [`El propietario con ID ${propietarioID} no existe.`],
                null
            );
        }

        // Validar relación entre propietario y mascota
        const pertenece = await this._repositoryMascota.propietarioEnMascota(mascotaID, propietarioID);
        if (!pertenece) {
            throw new ResponseException(
                StatusCodes.CONFLICT,
                [`La mascota con ID ${mascotaID} no pertenece al propietario con ID ${propietarioID}.`],
                null
            );
        }

        const fechaHabil = await this._repositoryCita.fechaDisponible(new Date(inicioCita));

        if (fechaHabil) {
            throw new ResponseException(
                StatusCodes.CONFLICT,
                [`La fecha y hora ya esta ocupada.`],
                null
            );
        }

        const response = await this._repositoryCita.create(citaCreateDTO.toObject());
        return new CitaDTO(response);
    }

    async updateCita(id: string, cita: CitaUpdateDTO) {

        const { citaInicio } = cita;

        const fechaHabil = await this._repositoryCita.fechaDisponible(new Date(citaInicio));

        if (fechaHabil) {
            throw new ResponseException(
                StatusCodes.CONFLICT,
                [`La fecha y hora ya esta ocupada.`],
                null
            );
        }
        const response = await this._repositoryCita.update(id, cita.toObject());
        return new CitaDTO(response);
    }

    async getFechas() {
        const fechas = await this._repositoryCita.getFechas();

        return fechas.map(datos => new CitaDTO(datos).toCitaObject());
    }
    createCitaGeneral() {

    }
}