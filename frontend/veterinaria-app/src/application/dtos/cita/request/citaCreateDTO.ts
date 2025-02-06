import { CitaRequest } from "@/domain/interfaces/api/request/citas/citaRequest";

export class CitaCreateDTO {
    inicioCita: string;
    finCita: string;
    motivo: string;
    propietarioID: string;
    mascotaID: string;

    constructor(cita: { mascotaId: string, fecha: string, finCita: string, motivo: string, propietarioId: string }) {
        this.inicioCita = cita.fecha;
        this.mascotaID = cita.mascotaId;
        this.motivo = cita.motivo;
        this.propietarioID = cita.propietarioId;
        this.mascotaID = cita.mascotaId;
    }

    toObjectRequest(): CitaRequest {
        return {
            ...this,
            inicioCita: new Date(this.inicioCita).toISOString(),
            finCita: new Date(this.finCita).toISOString()
        };
    }

}