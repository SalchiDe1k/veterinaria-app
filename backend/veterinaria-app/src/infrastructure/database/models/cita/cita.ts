import { Schema, model, Document, Types } from "mongoose";
import { ICita } from "../../../../domain/models/cita/ICita";

// Extiende Document para los modelos de MongoDB
export interface ICitaDocument
    extends Omit<ICita, "_id" | "propietarioId" | "mascotaId">,
    Document {
    _id: string;
    propietarioId: { type: Types.ObjectId, ref: "propietarios", required: true },
    mascotaId: { type: Types.ObjectId, ref: "mascotas", required: true },
    createdAt: Date; // Fecha de creación
    updatedAt: Date; // Fecha de última actualización
}

const CitaSchema = new Schema<ICitaDocument>(
    {
        start: {
            type: Date,
            required: [true, "El campo 'start' es obligatorio"],
        },
        end: {
            type: Date,
            required: [true, "El campo 'end' es obligatorio"],
        },
        title: {
            type: String,
            required: [true, "El campo 'title' es obligatorio"],
        },
        motivo : {
            type: String,
            required: [true, "El campo 'motivo' es obligatorio"],
        },
        mascotaId: {
            type: Schema.Types.ObjectId,
            ref: "mascotas",
            required: [true, "El campo 'mascotaId' es obligatorio."],
        },
        propietarioId: {
            type: Schema.Types.ObjectId,
            ref: "propietarios",
            required: [true, "El campo 'propietarioId' es obligatorio."],
        },
    },
    {
        timestamps: true, // Habilita createdAt y updatedAt automáticamente
    }
);


export const CitaModel = model<ICitaDocument>("citas", CitaSchema);
