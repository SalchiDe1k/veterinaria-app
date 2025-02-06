import { IsNotEmpty, IsString, IsUUID, IsDateString } from 'class-validator';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Helper para mensajes personalizados en español
function mensajeError(mensaje: string): ValidationOptions {
    return {
        message: mensaje,
    };
}

export class CitaCreateDTO {
    @IsNotEmpty(mensajeError('La fecha de inicio de la cita es obligatoria.'))
    @IsDateString({}, mensajeError('La fecha de inicio de la cita debe ser una fecha válida en formato ISO 8601.'))
    inicioCita: string;

    @IsNotEmpty(mensajeError('La fecha de fin de la cita es obligatoria.'))
    @IsDateString({}, mensajeError('La fecha de fin de la cita debe ser una fecha válida en formato ISO 8601.'))
    finCita: string;

    @IsNotEmpty(mensajeError('El motivo de la cita es obligatorio.'))
    @IsString(mensajeError('El motivo de la cita debe ser un texto válido.'))
    motivo: string;

    @IsNotEmpty(mensajeError('El ID del propietario es obligatorio.'))
    // @IsUUID(undefined, mensajeError('El ID del propietario debe ser un UUID válido.'))
    propietarioID: string;

    @IsNotEmpty(mensajeError('El ID de la mascota es obligatorio.'))
    // @IsUUID(undefined, mensajeError('El ID de la mascota debe ser un UUID válido.'))
    mascotaID: string;

    constructor(cita: any) {
        this.inicioCita = cita.inicioCita;
        this.finCita = cita.finCita;
        this.motivo = cita.motivo;
        this.propietarioID = cita.propietarioID;
        this.mascotaID = cita.mascotaID;
    }

    toObject() {
        return {
            start: new Date(this.inicioCita),
            end: new Date(this.finCita),
            title: 'Cita Veterinaria',
            motivo: this.motivo,
            propietarioId: this.propietarioID,
            mascotaId: this.mascotaID
        };
    }
}
