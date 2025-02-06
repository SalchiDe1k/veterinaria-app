import { IMascotaDocument } from "../../../infrastructure/database/models/mascota/mascotaModel";
import { IMascota } from "../../models/mascota/IMascota";
import { IRepository } from "../IRepository";

export interface IMascotaRepository extends IRepository<IMascotaDocument|IMascota> {
    /**
        * Obtiene todas las mascotas almacenadas en la base de datos.
        * @returns {Promise<IMascotaDocument[]>} Lista de mascotas.
        * @throws {ResponseException} Si ocurre un error al obtener las mascotas.
        */
    getAll(): Promise<IMascotaDocument[]>;
    /**
       * Crea una nueva mascota en la base de datos.
       * @param {Partial<IMascota>} data Datos parciales de la mascota.
       * @returns {Promise<IMascotaDocument>} La mascota creada.
       * @throws {ResponseException} Si ocurre un error al crear la mascota.
       */
    create(data: Partial<IMascota>): Promise<IMascotaDocument>;
    /**
        * Actualiza una mascota existente en la base de datos.
        * @param {string} id ID de la mascota a actualizar.
        * @param {Partial<IMascotaDocument>} data Datos parciales para actualizar.
        * @returns {Promise<IMascotaDocument | null>} La mascota actualizada o `null` si no existe.
        * @throws {ResponseException} Si la mascota no se encuentra o ocurre un error.
        */
    update(id: string, data: Partial<IMascota>): Promise<IMascotaDocument | null>;
    /**
     * Elimina una mascota de la base de datos por su ID.
     * @param {string} id ID de la mascota a eliminar.
     * @returns {Promise<boolean>} `true` si la mascota fue eliminada.
     * @throws {ResponseException} Si la mascota no se encuentra o ocurre un error.
     */
    delete(id: string): Promise<boolean>;
}