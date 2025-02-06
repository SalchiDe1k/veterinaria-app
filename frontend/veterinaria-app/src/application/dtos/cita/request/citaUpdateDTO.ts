export class CitaUpdateDTO {
    citaInicio: string;
    citaFin: string;

    constructor(cita: { citaInicio: string, citaFin: string }) {
        this.citaInicio = cita.citaInicio;
        this.citaFin = cita.citaFin;
    }

    toObject() {
        return {
            citaInicio: new Date(this.citaInicio).toISOString(),
            citaFin: new Date(this.citaFin).toISOString(),
        }
    }
}