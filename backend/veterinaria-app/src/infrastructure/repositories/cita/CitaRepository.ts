import { StatusCodes } from "http-status-codes";
import { ICita } from "../../../domain/models/cita/ICita";
import { ResponseException } from "../../exceptions/responseException";
import { CitaModel, ICitaDocument } from "../../database/models/cita/cita";

export class CitaRepository {
    async create(data: Partial<ICita>) {
        try {
            const cita = new CitaModel(data);
            const savedCita = await cita.save();

            // Populamos el propietario a partir de propietarioId
            const populatedMascota = await CitaModel.findById(
                savedCita._id
            ).populate("mascotaId").populate('propietarioId');

            if (!populatedMascota) {
                throw new Error("La cita no se encontró después de ser creada.");
            }

            return populatedMascota as ICitaDocument;

        } catch (error) {
            throw new ResponseException(StatusCodes.BAD_REQUEST, [
                "Error al crear cita.",
                error
            ]);
        }
    }
    async fechaDisponible(date: Date) {
        try {
            const dateExist = await CitaModel.exists({
                start: date
            });

            return Boolean(dateExist);
        } catch (error) {
            throw new ResponseException(StatusCodes.BAD_REQUEST, [
                "Error al comprobar si la fecha es habil cita.",
                error
            ]);
        }
    }

    async getFechas() {
        try {
            const fechas = await CitaModel.find();
            return fechas;
        } catch (error) {
            throw new ResponseException(StatusCodes.BAD_REQUEST, [
                "Error al trar la fechas",
                error
            ]);
        }
    }

    async update(id: string, data: Partial<ICita>) {
        try {
            const fechas = await CitaModel.findByIdAndUpdate(
                id,
                data,
                { new: true }
            )
            if (!fechas) {
                throw new ResponseException(StatusCodes.NOT_FOUND, [
                    `No se encontró el propietario con ID: ${id}`,
                ]);
            }
            return fechas;
        } catch (error) {
            throw new ResponseException(StatusCodes.BAD_REQUEST, [
                "Error al actualizar la cita",
                error
            ]);
        }
    }
}