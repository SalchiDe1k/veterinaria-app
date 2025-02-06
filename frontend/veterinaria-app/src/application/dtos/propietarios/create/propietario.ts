import { propietarioRequest } from "@/domain/interfaces/api/request/propietarios/propietario";
import { Propietario } from "@/domain/models/propietario/propietario";

export class PropietarioCreateDTO implements Propietario {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  telefono: string;
  numeroDocumento: string;
  correo: string;

  constructor(propietario: Propietario) {
    this.primerNombre = propietario.primerNombre;
    this.segundoNombre = propietario.segundoNombre;
    this.primerApellido = propietario.primerApellido;
    this.segundoApellido = propietario.segundoApellido;
    this.telefono = propietario.telefono;
    this.numeroDocumento = propietario.numeroDocumento;
    this.correo = propietario.correo;
  }

  toObject(): propietarioRequest {
    const data: propietarioRequest = {
      primerNombre: this.primerNombre,
      primerApellido: this.primerApellido,
      correo: this.correo,
      numero_identificacion: this.numeroDocumento,
      numero_telefono: this.telefono,
    };

    if (this.segundoNombre) {
      data.segundoNombre = this.segundoNombre;
    }

    if (this.segundoApellido) {
      data.segundoApellido = this.segundoApellido;
    }

    return data;
  }
}
