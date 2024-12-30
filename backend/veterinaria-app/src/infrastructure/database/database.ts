import mongoose from "mongoose";
import { config } from "../config/config"; // Configuración con URL de la BD

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.database.uri,{
            dbName : config.database.databaseName
        })
            .then(() => console.log('Connected!'));
        console.log("✅ Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1); // Detiene la aplicación en caso de error
    }
};
