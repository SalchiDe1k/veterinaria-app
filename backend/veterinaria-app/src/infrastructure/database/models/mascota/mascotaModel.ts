import { Schema, model, Document } from "mongoose";
import { IMascota } from "../../../../domain/models/mascota/IMascota";

// Extiende Document para los modelos de MongoDB
export interface IMascotaDocument extends Omit<IMascota, '_id'>, Document {
    _id: string;
}

const MascotaSchema = new Schema<IMascotaDocument>({

    nombre: {
        type: String,
        required: [true, "El campo 'nombre' es obligatorio."],
    },
    edad: {
        type: Number,
        required: [true, "El campo 'edad' es obligatorio."],
        min: [0, "La edad debe ser un número positivo."],
    },
    especie: {
        type: String,
        required: [true, "El campo 'especie' es obligatorio."],
    },
    raza: {
        type: String,
        required: [true, "El campo 'raza' es obligatorio."],
    },
    genero: {
        type: String,
        required: [true, "El campo 'género' es obligatorio."],
        enum: {
            values: ["Macho", "Hembra"],
            message: "El campo 'género' solo puede ser 'Macho' o 'Hembra'.",
        },
    },
    peso: {
        type: Number,
        required: [true, "El campo 'peso' es obligatorio."],
        min: [0.1, "El peso debe ser mayor a 0."],
    },
    color: {
        type: String,
        required: [true, "El campo 'color' es obligatorio."],
    },
    fecha_registro: {
        type: String,
        required: [true, "El campo 'fecha_registro' es obligatorio."],
    },
});

export const MascotaModel = model<IMascotaDocument>("mascotas", MascotaSchema);
