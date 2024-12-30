import { Paginacion } from "../../models/paginacion/pagination";
import { IPropietario } from "../../models/propietario/IPropietario";
import { IRepository } from "../IRepository";

export interface IPropietarioRepository extends IRepository<IPropietario> {
  /**
   * Obtiene todas las mascotas almacenadas en la base de datos.
   * @returns {Promise<IPropietario[]>} Lista de mascotas.
   * @throws {ResponseException} Si ocurre un error al obtener las mascotas.
   */
  getAll(): Promise<IPropietario[]>;
  /**
   * Crea una nueva mascota en la base de datos.
   * @param {Partial<IPropietario>} data Datos parciales de la mascota.
   * @returns {Promise<IPropietario>} La mascota creada.
   * @throws {ResponseException} Si ocurre un error al crear la mascota.
   */
  create(data: Partial<IPropietario>): Promise<IPropietario>;
  /**
   * Actualiza una mascota existente en la base de datos.
   * @param {string} id ID de la mascota a actualizar.
   * @param {Partial<IPropietario>} data Datos parciales para actualizar.
   * @returns {Promise<IPropietario | null>} La mascota actualizada o `null` si no existe.
   * @throws {ResponseException} Si la mascota no se encuentra o ocurre un error.
   */
  update(id: string, data: Partial<IPropietario>): Promise<IPropietario | null>;
  /**
   * Elimina una mascota de la base de datos por su ID.
   * @param {string} id ID de la mascota a eliminar.
   * @returns {Promise<boolean>} `true` si la mascota fue eliminada.
   * @throws {ResponseException} Si la mascota no se encuentra o ocurre un error.
   */
  delete(id: string): Promise<boolean>;
  /**
   * Verifica si un propietario existe en la base de datos basado en su número de identificación.
   * @param {string} numeroIdentificacion - Número de identificación del propietario.
   * @returns {Promise<boolean>} - Retorna `true` si existe, de lo contrario `false`.
   */
  existByNumeroIdentificacion(numeroIdentificacion: string): Promise<boolean>;
  paginacion(
    page: number,
    pageSize: number,
    protocol: string,
    host: string,
    path: string
  ): Promise<Paginacion<IPropietario>>;
}
