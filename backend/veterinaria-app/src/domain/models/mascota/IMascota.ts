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
   * Raza específica de la mascota (opcional).
   * @type {string}
   */
  raza?: string;

  /**
   * Edad de la mascota en años (opcional).
   * @type {number}
   */
  edad?: number;

  /**
   * Género de la mascota (e.g., macho, hembra).
   * @type {"Macho" | "Hembra"}
   */
  sexo: "Macho" | "Hembra";

  /**
   * Peso de la mascota en kilogramos (opcional).
   * @type {number}
   */
  peso?: number;

  /**
   * Color principal de la mascota (opcional).
   * @type {string}
   */
  color?: string;

  /**
   * ID del propietario de la mascota.
   * @type {string}
   */
  propietarioId: string;

  unidadPeso?: "kilogramos" | "gramos";
  unidadEdad?: "meses" | "años";
  
  createdAt?: Date;
  updatedAt?: Date;
}
