import { IMascota } from "../../../domain/models/mascota/IMascota";
import { IPropietario } from "../../../domain/models/propietario/IPropietario";
import { IMascotaDocument } from "../../../infrastructure/database/models/mascota/mascotaModel";
import { PropietarioDTO } from "../propietario/propietarioDTO";

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
  unidadEdad?: "meses" | "años";

  /** Género de la mascota (e.g., macho, hembra). */
  sexo: "Macho" | "Hembra";

  /** Peso de la mascota en kilogramos. */
  peso: number;
  unidadPeso?: "kilogramos" | "gramos"; 

  /** Color principal de la mascota. */
  color: string;

  propietario: PropietarioDTO;
  createdAt?: Date;
  updatedAt?: Date;
  /**
   * Crea una nueva instancia de MascotaDTO a partir de datos parciales de IMascota.
   * @param {Partial<IMascota>} mascota Datos parciales para la inicialización del DTO.
   */

  constructor(mascota: IMascotaDocument) {
    this.id = mascota._id ?? "";
    this.nombre = mascota.nombre ?? "";
    this.especie = mascota.especie ?? "";
    this.raza = mascota.raza ?? "";
    this.edad = mascota.edad ?? 0;
    this.unidadEdad = mascota.unidadEdad ?? "meses";
    // this.genero = mascota.genero ?? '';
    this.peso = mascota.peso ?? 0;
    this.unidadPeso = mascota.unidadPeso ?? "gramos";
    this.color = mascota.color ?? "";
    this.propietario = new PropietarioDTO(
      mascota.propietarioId as unknown as IPropietario
    );
    this.sexo = mascota.sexo;
    this.createdAt = mascota.createdAt ?? new Date();
    this.updatedAt = mascota.updatedAt ?? new Date();
  }
}
