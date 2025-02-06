import { IMascota } from "../../../domain/models/mascota/IMascota";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsOptional,
} from "class-validator";

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

  /** Raza específica de la mascota (opcional). */
  @IsString()
  @IsOptional()
  raza?: string;

  /** Edad de la mascota (opcional). */
  @IsNumber()
  @IsOptional()
  @Min(0, { message: "La edad debe ser un número positivo." })
  edad?: number;

  /** Unidad de la edad (e.g., meses, años). */
  @IsString()
  @IsOptional()
  @IsEnum(["meses", "años"], {
    message: "El campo 'unidadEdad' solo puede ser 'meses' o 'años'.",
  })
  unidadEdad?: "meses" | "años";

  /** Género de la mascota (e.g., macho, hembra). */
  @IsString()
  @IsNotEmpty({ message: "El campo 'sexo' es obligatorio." })
  @IsEnum(["Macho", "Hembra"], {
    message: "El campo 'sexo' solo puede ser 'Macho' o 'Hembra'.",
  })
  sexo: "Macho" | "Hembra";

  /** Peso de la mascota (opcional). */
  @IsNumber()
  @IsOptional()
  @Min(0.1, { message: "El peso debe ser mayor a 0." })
  peso?: number;

  /** Unidad del peso (e.g., kilogramos, gramos). */
  @IsString()
  @IsOptional()
  @IsEnum(["kilogramos", "gramos"], {
    message: "El campo 'unidadPeso' solo puede ser 'kilogramos' o 'gramos'.",
  })
  unidadPeso?: "kilogramos" | "gramos";

  /** Color principal de la mascota (opcional). */
  @IsString()
  @IsOptional()
  color?: string;

  /** ID del propietario de la mascota. */
  @IsString()
  @IsNotEmpty({ message: "El campo 'propietarioId' es obligatorio." })
  propietarioId: string;

  /**
   * Crea una nueva instancia de MascotaCreateDTO.
   * @param {IMascota} mascota Objeto que contiene los datos de la mascota.
   */
  constructor(mascota: IMascota) {
    this.nombre = mascota.nombre ?? "";
    this.especie = mascota.especie ?? "";
    this.raza = mascota.raza;
    this.edad = mascota.edad;
    this.unidadEdad = mascota.unidadEdad;
    this.sexo = mascota.sexo;
    this.peso = mascota.peso;
    this.unidadPeso = mascota.unidadPeso;
    this.color = mascota.color;
    this.propietarioId = mascota.propietarioId ?? "";
  }

  /**
   * Convierte la instancia de MascotaCreateDTO a un objeto plano de tipo IMascota.
   * @returns {IMascota} Objeto con los datos de la mascota.
   */
  toObject(): IMascota {
    const {
      nombre,
      especie,
      sexo,
      propietarioId,
      raza,
      edad,
      unidadEdad,
      peso,
      unidadPeso,
      color,
    } = this;

    return {
      nombre,
      especie,
      sexo,
      propietarioId,
      ...(raza && { raza }),
      ...(edad && { edad }),
      ...(unidadEdad && { unidadEdad }),
      ...(peso && { peso }),
      ...(unidadPeso && { unidadPeso }),
      ...(color && { color }),
    };
  }
}
