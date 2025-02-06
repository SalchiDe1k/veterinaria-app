import { IsNotEmpty, IsDateString } from 'class-validator';
import { ValidationOptions } from 'class-validator';

// Helper para mensajes personalizados en español
function mensajeError(mensaje: string): ValidationOptions {
    return {
        message: mensaje,
    };
}

export class CitaUpdateDTO {

    @IsNotEmpty(mensajeError('La fecha de inicio de la cita es obligatoria.'))
    @IsDateString({}, mensajeError('La fecha de inicio de la cita debe ser una fecha válida en formato ISO 8601.'))
    citaInicio: string;
    @IsNotEmpty(mensajeError('La fecha de fin de la cita es obligatoria.'))
    @IsDateString({}, mensajeError('La fecha de fin de la cita debe ser una fecha válida en formato ISO 8601.'))
    citaFin: string;

    constructor(cita: any) {
        this.citaInicio = cita.citaInicio;
        this.citaFin = cita.citaFin;
    }

    toObject() {
        return {
            start: new Date(this.citaInicio),
            end: new Date(this.citaFin),
        }
    }
}