import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { IPropietario } from "../../../domain/models/propietario/IPropietario";
import { IPropietarioCreate } from "../../../domain/models/propietario/IPropietarioCreate";

/**
 * Clase para representar y validar la creación de un propietario.
 * Implementa la interfaz `IPropietario`.
 */
export class PropietarioCreateDTO implements IPropietarioCreate {
  /**
   * Nombre del propietario.
   * @type {string}
   */
  @IsString({ message: "El campo primerNombre debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El campo nombre no puede estar vacío." })
  primerNombre: string;

  /**
   * Segundo nombre del propietario.
   * @type {string | null}
   */
  @IsString({ message: "El campo segundoNombre debe ser una cadena de texto." })
  @IsOptional()
  // @Matches(/^$/, { message: "El campo segundoNombre debe ser nulo." })
  segundoNombre: string | null = null;

  /**
   * Nombre del propietario.
   * @type {string}
   */
  @IsString({
    message: "El campo primerApellido debe ser una cadena de texto.",
  })
  @IsNotEmpty({ message: "El campo nombre no puede estar vacío." })
  primerApellido: string;

  /**
   * Nombre del propietario.
   * @type {string}
   */
  @IsString({
    message: "El campo segundoApellido debe ser una cadena de texto.",
  })
  @IsOptional()
  segundoApellido: string | null = null;

  /**
   * Correo electrónico del propietario.
   * Debe ser un correo válido.
   * @type {string}
   */
  @IsString({ message: "El campo correo debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El campo correo no puede estar vacío." })
  @IsEmail({}, { message: "El campo correo debe ser un correo válido." })
  correo: string;

  /**
   * Número de teléfono del propietario.
   * Debe contener 10 dígitos y puede incluir el prefijo +57.
   * @type {string}
   */
  @IsString({
    message: "El campo número de teléfono debe ser una cadena de texto.",
  })
  @IsNotEmpty({ message: "El campo número de teléfono no puede estar vacío." })
  @Matches(/^(\+57|57)?\d{10}$/, {
    message:
      "El número de teléfono debe ser un número válido en Colombia con 10 dígitos, con o sin el prefijo +57.",
  })
  numero_telefono: string;

  /**
   * Número de identificación del propietario.
   * Debe contener entre 6 y 10 dígitos.
   * @type {string}
   */
  @IsString({
    message: "El campo número de identificación debe ser una cadena de texto.",
  })
  @IsNotEmpty({
    message: "El campo número de identificación no puede estar vacío.",
  })
  @Matches(/^\d{6,10}$/, {
    message: "El número de identificación debe contener entre 6 y 10 dígitos.",
  })
  numero_identificacion: string;

  /**
   * Fecha de última actualización.
   * Se inicializa con la fecha actual.
   * @type {string}
   */
  updated_at: string = new Date().toISOString();

  /**
   * Constructor de la clase.
   * Inicializa las propiedades a partir de un objeto `IPropietario`.
   * @param {IPropietario} propietario - Objeto con los datos del propietario.
   */
  constructor(propietario: IPropietarioCreate) {
    this.primerNombre = propietario.primerNombre;
    this.segundoNombre = propietario.segundoNombre ?? null;
    this.primerApellido = propietario.primerApellido;
    this.segundoApellido = propietario.segundoApellido ?? null;
    this.numero_identificacion = propietario.numero_identificacion;
    this.numero_telefono = propietario.numero_telefono;
    this.correo = propietario.correo;
  }

  /**
   * Convierte la instancia de la clase en un objeto plano `IPropietario`.
   * @returns {IPropietario} Objeto con los datos del propietario.
   */
  toObject(): IPropietarioCreate {
    const data: IPropietarioCreate = {
      primerNombre: this.primerNombre,
      primerApellido: this.primerApellido,
      correo: this.correo,
      numero_identificacion: this.numero_identificacion,
      numero_telefono: this.numero_telefono,
      updated_at: this.updated_at,
    };

    if (this.segundoNombre) {
      data.segundoNombre = this.segundoNombre;
    }

    if (this.segundoApellido) {
      data.segundoApellido = this.segundoNombre;
    }

    return data;
  }
}
