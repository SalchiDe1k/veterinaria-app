import { IPropietario } from "../../../domain/models/propietario/IPropietario";
import { ICitaDocument } from "../../../infrastructure/database/models/cita/cita";
import { MascotaDTO } from "../mascotas/mascotaDTO";
import { PropietarioDTO } from "../propietario/propietarioDTO";

export class CitaDTO {
    id?: string;
    start: string;
    end: string;
    title: string;
    motivo: string;
    mascota: MascotaDTO;
    propietario: PropietarioDTO;
    constructor(cita: any) {
        this.id = cita._id ?? undefined;
        this.start = cita.start;
        this.end = cita.end;
        this.title = cita.title;
        this.mascota = cita.mascotaId
        this.propietario = new PropietarioDTO(
            cita.propietarioId as unknown as IPropietario
        );
    }

    toCitaObject() {
        return {
            id: this.id,
            start: this.start,
            end: this.end,
            title: this.title,
            color : "#ff9f89"
        }
    }
}