/**
 * Interfaz que representa la entidad Mascota.
 */
export interface IMascota {
    /**
     * ID único de la mascota (opcional).
     * @type {string}
     */
    _id?: string;

    /**
     * Nombre de la mascota.
     * @type {string}
     */
    nombre: string;

    /**
     * Especie de la mascota (e.g., perro, gato, etc.).
     * @type {string}
     */
    especie: string;

    /**
     * Raza específica de la mascota.
     * @type {string}
     */
    raza: string;

    /**
     * Edad de la mascota en años.
     * @type {number}
     */
    edad: number;

    /**
     * Género de la mascota (e.g., macho, hembra).
     * @type {string}
     */
    genero: string;

    /**
     * Peso de la mascota en kilogramos.
     * @type {number}
     */
    peso: number;

    /**
     * Color principal de la mascota.
     * @type {string}
     */
    color: string;

    /**
     * Fecha en la que se registró la mascota.
     * @type {string}
     * @example "2024-12-17T12:00:00Z"
     */
    fecha_registro: string;
}
