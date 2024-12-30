import { IPropietario } from "../../../domain/models/propietario/IPropietario";

export class PropietarioDTO {

    id?: string;
    nombre: string;
    correo: string;
    numeroIdentificacion: string;
    numeroTelefono: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(propietario: IPropietario) {
        this.id = propietario._id ?? null;
        this.nombre = propietario.primerNombre  ?? '';
        this.correo = propietario.correo ?? '';
        this.numeroIdentificacion = propietario.numero_identificacion ?? '';
        this.numeroTelefono = propietario.numero_telefono ?? '';
        this.createdAt = propietario.created_at ?? null;
        this.updatedAt = propietario.updated_at ?? null;
    }
}