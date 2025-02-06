// import { propietarioRequest } from "@/domain/interfaces/api/request/propietarios/propietario";
import { PropietarioResponse } from "@/domain/interfaces/api/response/propietario/propietario";
import { Propietario } from "@/domain/models/propietario/propietario";

export class PropietarioResponseDTO {
  id: string;
  nombre: string;
  correo: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido: string;
  numeroIdentificacion: string;
  numeroTelefono: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: PropietarioResponse) {
    this.id = data.id ?? "";
    this.nombre = [
      data.primerNombre,
      data.segundoNombre,
      data.primerApellido,
      data.segundoApellido,
    ].join(" ");
    this.primerNombre = data.primerNombre ?? "";
    this.segundoNombre = data.segundoNombre ?? "";
    this.primerApellido = data.primerApellido ?? "";
    this.segundoApellido = data.segundoApellido ?? "";
    this.correo = data.correo ?? "";
    this.numeroIdentificacion = data.numeroIdentificacion ?? "";
    this.numeroTelefono = data.numeroTelefono ?? "";
    this.createdAt = data.createdAt ?? "";
    this.updatedAt = data.updatedAt ?? "";
  }
  toObjectFormulario(): Propietario {
    return {
      primerNombre: this.primerNombre,
      segundoNombre: this.segundoNombre,
      primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido,
      correo: this.correo,
      numeroDocumento: this.numeroIdentificacion,
      telefono: this.numeroTelefono,
    };
  }

  toSelectOption() {
    return {
      value: this.id,
      label: this.nombre + " (" + this.numeroTelefono + ")",
    };
  }
}
