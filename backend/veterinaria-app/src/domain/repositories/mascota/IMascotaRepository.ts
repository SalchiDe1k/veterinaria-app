import { IMascota } from "../../models/mascota/IMascota";
import { IRepository } from "../IRepository";

export interface IMascotaRepository extends IRepository<IMascota> {
    /**
        * Obtiene todas las mascotas almacenadas en la base de datos.
        * @returns {Promise<IMascota[]>} Lista de mascotas.
        * @throws {ResponseException} Si ocurre un error al obtener las mascotas.
        */
    getAll(): Promise<IMascota[]>;
    /**
       * Crea una nueva mascota en la base de datos.
       * @param {Partial<IMascota>} data Datos parciales de la mascota.
       * @returns {Promise<IMascota>} La mascota creada.
       * @throws {ResponseException} Si ocurre un error al crear la mascota.
       */
    create(data: Partial<IMascota>): Promise<IMascota>;
    /**
        * Actualiza una mascota existente en la base de datos.
        * @param {string} id ID de la mascota a actualizar.
        * @param {Partial<IMascota>} data Datos parciales para actualizar.
        * @returns {Promise<IMascota | null>} La mascota actualizada o `null` si no existe.
        * @throws {ResponseException} Si la mascota no se encuentra o ocurre un error.
        */
    update(id: string, data: Partial<IMascota>): Promise<IMascota | null>;
    /**
     * Elimina una mascota de la base de datos por su ID.
     * @param {string} id ID de la mascota a eliminar.
     * @returns {Promise<boolean>} `true` si la mascota fue eliminada.
     * @throws {ResponseException} Si la mascota no se encuentra o ocurre un error.
     */
    delete(id: string): Promise<boolean>;
}