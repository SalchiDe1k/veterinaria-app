import { Schema, model, Document } from "mongoose";
import { IPropietario } from "../../../../domain/models/propietario/IPropietario";

// Extiende Document para los modelos de MongoDB
export interface IPropietarioDocument extends Omit<IPropietario, '_id'>, Document {
    _id: string;
}

// Define el esquema de Propietario
const PropietarioSchema = new Schema<IPropietarioDocument>({
    primerNombre: {
        type: String,
        required: [true, "El campo 'primerNombre' es obligatorio."],
    },
    segundoNombre: {
        type: String,
        required: false,
    },
    primerApellido: {
        type: String,
        required: [true, "El campo 'primerApellido' es obligatorio."],
    },
    segundoApellido: {
        type: String,
        required: false,
    },
    correo: {
        type: String,
        required: [true, "El campo 'correo' es obligatorio."],
        match: [/\S+@\S+\.\S+/, "El campo 'correo' debe ser un correo válido."],
    },
    numero_telefono: {
        type: String,
        required: [true, "El campo 'número de teléfono' es obligatorio."],
        match: [/^(\+57|57)?\d{10}$/, "El número de teléfono debe ser un número válido en Colombia con 10 dígitos, con o sin el prefijo +57."],
    },
    numero_identificacion: {
        type: String,
        required: [true, "El campo 'número de identificación' es obligatorio."],
    },
    created_at: {
        type: String,
        required: [true, "El campo 'created_at' es obligatorio."],
        default: () => new Date().toISOString(),
    },
    updated_at: {
        type: String,
        required: [true, "El campo 'updated_at' es obligatorio."],
        default: () => new Date().toISOString(),
    },
});

// Define el modelo de Propietario
export const PropietariosModel = model<IPropietarioDocument>("propietarios", PropietarioSchema);
