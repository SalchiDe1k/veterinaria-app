import { PropietarioResponse } from "@/domain/interfaces/api/response/propietario/propietario";

export class PropietarioResponseDTO implements PropietarioResponse {
    
    id: string;
    nombre: string;
    correo: string;
    numeroIdentificacion: string;
    numeroTelefono: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: PropietarioResponse) {
        this.id = data.id ?? '';
        this.nombre = data.nombre ?? '';
        this.correo = data.correo ?? '';
        this.numeroIdentificacion = data.numeroIdentificacion ?? '';
        this.numeroTelefono = data.numeroTelefono ?? '';
        this.createdAt = data.createdAt ?? '';
        this.updatedAt = data.updatedAt ?? '';
    }

}