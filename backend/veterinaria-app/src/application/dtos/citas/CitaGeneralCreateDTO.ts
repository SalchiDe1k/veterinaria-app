
export class CitaGeneralCreateDTO {

    inicioCita: string; // La fecha de la cita
    finCita: string;
    motivo: string; // El motivo de la cita
    primerNombre: string; // Primer nombre del propietario
    segundoNombre?: string; // Segundo nombre del propietario (opcional)
    primerApellido: string; // Primer apellido del propietario
    segundoApellido?: string; // Segundo apellido del propietario (opcional)
    telefono: string; // Teléfono del propietario
    numeroDocumento: string; // Número de documento del propietario
    correo: string; // Correo del propietario
    nombreMascota: string; // Nombre de la mascota
    especie: string; // Especie de la mascota
    raza?: string; // Raza de la mascota (opcional)
    sexo: string; // Género de la mascota
    edad?: number | null; // Edad de la mascota (opcional, puede ser null)
    unidadEdad?: "meses" | "años"; // Unidad de edad (opcional, depende de "edad")
    peso?: number | null; // Peso de la mascota (opcional, puede ser null)
    unidadPeso?: "kilogramos" | "gramos"; // Unidad de peso (opcional, depende de "peso")
    color?: string; // Color de la mascota (opcional)

    constructor(cita: any) {
        this.inicioCita = cita.inicioCita;
        this.finCita = cita.finCita;
        this.motivo = cita.motivo;
        this.primerNombre = cita.primerNombre;
        this.segundoNombre = cita.segundoNombre;
        this.primerApellido = cita.primerApellido;
        this.segundoApellido = cita.segundoApellido;
        this.telefono = cita.telefono;
        this.numeroDocumento = cita.numeroDocumento;
        this.correo = cita.correo;
        this.nombreMascota = cita.nombreMascota;
        this.especie = cita.especie;
        this.raza = cita.raza;
        this.sexo = cita.sexo;
        this.edad = cita.edad;
        this.unidadEdad = cita.unidadEdad;
        this.peso = cita.peso;
        this.unidadPeso = cita.unidadPeso;
        this.color = cita.color;
    }

    toPropietarioObject() {

    }

    toMascotaObject() {

    }

    toCitaObject() {

    }
}
