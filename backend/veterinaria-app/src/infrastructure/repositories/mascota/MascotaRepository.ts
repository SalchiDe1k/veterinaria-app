import { StatusCodes as codes } from "http-status-codes";
import { IMascota } from "../../../domain/models/mascota/IMascota";
import { IMascotaRepository } from "../../../domain/repositories/mascota/IMascotaRepository";
import { MascotaModel } from "../../database/models/mascota/mascotaModel";
import { ResponseException } from "../../exceptions/responseException";

/**
 * Clase que implementa operaciones CRUD para la entidad Mascota.
 * @implements IMascotaRepository
 */
export class MascotaRepository implements IMascotaRepository {
   
    async getAll(): Promise<IMascota[]> {
        try {
            return await MascotaModel.find();
        } catch (error) {
            throw new ResponseException(codes.BAD_REQUEST, ["Error al obtener las mascotas."]);
        }
    }
  
    async create(data: Partial<IMascota>): Promise<IMascota> {
        try {
            const mascota = new MascotaModel(data);
            return await mascota.save();
        } catch (error) {

            const responseException = new ResponseException(codes.BAD_REQUEST,
                ["Error al crear la mascota", error.message]
            );

            for (const field in error.errors) {
                responseException.addMessage(error.errors[field].message);
            }

            throw responseException;

        }
    }

    async update(id: string, data: Partial<IMascota>): Promise<IMascota | null> {
        try {
            const updatedMascota = await MascotaModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedMascota) {
                throw new ResponseException(
                    codes.NOT_FOUND,
                    [`No se encontró la mascota con ID: ${id}`]);
            }
            return updatedMascota;
        } catch (error) {
            throw new ResponseException(codes.BAD_REQUEST,
                ["Error al actualizar la mascota."]);
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await MascotaModel.findByIdAndDelete(id);
            if (!result) {
                throw new ResponseException(codes.NOT_FOUND,
                    [`No se encontró la mascota con ID: ${id}`]);
            }
            return true;
        } catch (error) {
            throw new ResponseException(codes.BAD_REQUEST,
                ["Error al eliminar la mascota."]);
        }
    }
}
