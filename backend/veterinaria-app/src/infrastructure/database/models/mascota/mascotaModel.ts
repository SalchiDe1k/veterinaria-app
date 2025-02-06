import { Schema, model, Document, Types } from "mongoose";
import { IMascota } from "../../../../domain/models/mascota/IMascota";

// Extiende Document para los modelos de MongoDB
export interface IMascotaDocument
  extends Omit<IMascota, "_id" | "propietarioId">,
    Document {
  _id: string;
  propietarioId: { type: Types.ObjectId, ref: "Propietario", required: true },
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de última actualización
}

const MascotaSchema = new Schema<IMascotaDocument>(
  {
    nombre: {
      type: String,
      required: [true, "El campo 'nombre' es obligatorio."],
    },
    especie: {
      type: String,
      required: [true, "El campo 'especie' es obligatorio."],
    },
    raza: {
      type: String,
      required: false,
    },
    edad: {
      type: Number,
      required: false,
      min: [0, "La edad debe ser un número positivo."],
    },
    sexo: {
      type: String,
      required: [true, "El campo 'género' es obligatorio."],
      enum: {
        values: ["Macho", "Hembra"],
        message: "El campo 'género' solo puede ser 'Macho' o 'Hembra'.",
      },
    },
    peso: {
      type: Number,
      required: false,
      min: [0.1, "El peso debe ser mayor a 0."],
    },
    color: {
      type: String,
      required: false,
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

export const MascotaModel = model<IMascotaDocument>("mascotas", MascotaSchema);
