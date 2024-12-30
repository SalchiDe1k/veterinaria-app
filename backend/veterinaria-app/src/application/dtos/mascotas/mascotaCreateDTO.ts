import { IMascota } from "../../../domain/models/mascota/IMascota";
import { IsString, IsNotEmpty, IsNumber, Min, Max, IsEnum, Matches, isString } from 'class-validator';
import { formatDate } from "../../utils/dtosUtils";
import { IsValidDate } from "../../../domain/validators/isValidDate";

/**
 * Data Transfer Object (DTO) para la creación de una nueva mascota.
 * @implements {IMascota}
 */

export class MascotaCreateDTO implements IMascota {

    /** Nombre de la mascota. */
    @IsString()
    @IsNotEmpty({ message: "El campo 'nombre' es obligatorio." })
    nombre: string;

    /** Especie de la mascota (e.g., perro, gato, etc.). */
    @IsString()
    @IsNotEmpty({ message: "El campo 'especie' es obligatorio." })
    especie: string;

    /** Raza específica de la mascota. */
    @IsString()
    @IsNotEmpty({ message: "El campo 'raza' es obligatorio." })
    raza: string;

    /** Edad de la mascota en años. */
    @IsNumber()
    @IsNotEmpty({ message: "El campo 'edad' es obligatorio." })
    @Min(0, { message: "La edad debe ser un número positivo." })
    edad: number;

    /** Género de la mascota (e.g., Macho, Hembra). */
    @IsString()
    @IsNotEmpty({ message: "El campo 'género' es obligatorio." })
    @IsEnum(['Macho', 'Hembra'], { message: "El campo 'género' solo puede ser 'Macho' o 'Hembra'." })
    genero: string;

    /** Peso de la mascota en kilogramos. */
    @IsNumber()
    @IsNotEmpty({ message: "El campo 'peso' es obligatorio." })
    @Min(0.1, { message: "El peso debe ser mayor a 0." })
    peso: number;

    /** Color principal de la mascota. */
    @IsString()
    @IsNotEmpty({ message: "El campo 'color' es obligatorio." })
    color: string;

    /** Fecha de registro de la mascota en formato string. */
    @IsString()
    @IsNotEmpty({ message: "El campo 'fecha_registro' es obligatorio." })
    @IsValidDate({ message: "La fecha debe ser válida y estar en el formato 'YYYY-MM-DD'." })
    fecha_registro: string;

    /**
     * Crea una nueva instancia de MascotaCreateDTO.
     * @param {IMascota} mascota Objeto que contiene los datos de la mascota.
     */
    constructor(mascota: IMascota) {
        this.nombre = mascota.nombre ?? '';
        this.especie = mascota.especie ?? '';
        this.raza = mascota.raza ?? '';
        this.edad = mascota.edad ?? 0;
        this.genero = mascota.genero ?? '';
        this.peso = mascota.peso ?? 0;
        this.color = mascota.color ?? '';
        this.fecha_registro = mascota.fecha_registro ?? formatDate();
    }

    /**
     * Convierte la instancia de MascotaCreateDTO a un objeto plano de tipo IMascota.
     * @returns {IMascota} Objeto con los datos de la mascota.
     */
    toObject(): IMascota {
        return {
            nombre: this.nombre,
            especie: this.especie,
            raza: this.raza,
            edad: this.edad,
            genero: this.genero,
            peso: this.peso,
            color: this.color,
            fecha_registro: this.fecha_registro
        };
    }
}