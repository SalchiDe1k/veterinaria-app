import { Schema, model, Document } from "mongoose";
import { IUsuario } from "../../../../domain/models/usuarios/IUsuario";

// Extiende Document para los modelos de MongoDB
export interface IUsuarioDocument extends Omit<IUsuario, '_id'>, Document {
    _id: string;
    createdAt: Date; // Fecha de creación
    updatedAt: Date; // Fecha de última actualización
}

// Define el esquema de Propietario
const UsuarioSchema = new Schema<IUsuarioDocument>({
    password: {
        type: String,
        required: [true, "El campo 'password' es obligatorio."],
    },
    email: {
        type: String,
        required: [true, "El campo 'email' es obligatorio."],
        match: [/\S+@\S+\.\S+/, "El campo 'email' debe ser un correo válido."],
    },

}, {
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
});

// Define el modelo de Propietario
export const UsuariosModel = model<IUsuarioDocument>("users", UsuarioSchema);
