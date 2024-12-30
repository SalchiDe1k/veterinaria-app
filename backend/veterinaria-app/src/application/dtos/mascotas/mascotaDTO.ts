import { IMascota } from "../../../domain/models/mascota/IMascota";

/**
 * Data Transfer Object (DTO) para la entidad Mascota.
 * @implements Partial<IMascota>
 */
export class MascotaDTO implements Partial<IMascota> {

    /** ID único de la mascota. */
    id: string;

    /** Nombre de la mascota. */
    nombre: string;

    /** Especie de la mascota (e.g., perro, gato). */
    especie: string;

    /** Raza específica de la mascota. */
    raza: string;

    /** Edad de la mascota en años. */
    edad: number;

    /** Género de la mascota (e.g., macho, hembra). */
    genero: string;

    /** Peso de la mascota en kilogramos. */
    peso: number;

    /** Color principal de la mascota. */
    color: string;

    /** Fecha de registro de la mascota (en formato string). */
    fechaRegistro: string;

    /**
     * Crea una nueva instancia de MascotaDTO a partir de datos parciales de IMascota.
     * @param {Partial<IMascota>} mascota Datos parciales para la inicialización del DTO.
     */

    constructor(mascota: Partial<IMascota>) {
        this.id = mascota._id ?? '';
        this.nombre = mascota.nombre ?? '';
        this.especie = mascota.especie ?? '';
        this.raza = mascota.raza ?? '';
        this.edad = mascota.edad ?? 0;
        this.genero = mascota.genero ?? '';
        this.peso = mascota.peso ?? 0;
        this.color = mascota.color ?? '';
        this.fechaRegistro = mascota.fecha_registro ?? new Date().toString();
    }
}