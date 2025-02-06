import { IPropietario } from "../../../domain/models/propietario/IPropietario";

export class PropietarioDTO {

    id?: string;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido: string;
    correo: string;
    numeroIdentificacion: string;
    numeroTelefono: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(propietario: IPropietario) {
        this.id = propietario._id ?? null;
        this.primerNombre = propietario.primerNombre  ?? '';
        if (propietario.segundoNombre) {
            this.segundoNombre = propietario.segundoNombre ?? '';
        }
        this.primerApellido = propietario.primerApellido  ?? '';
        if (propietario.segundoApellido) {
            this.segundoApellido = propietario.segundoApellido ?? '';
        }
        this.correo = propietario.correo ?? '';
        this.numeroIdentificacion = propietario.numero_identificacion ?? '';
        this.numeroTelefono = propietario.numero_telefono ?? '';
        this.createdAt = propietario.created_at ?? null;
        this.updatedAt = propietario.updated_at ?? null;
    }
}