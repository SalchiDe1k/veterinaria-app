import { app } from "../app";
import { config } from "./config/config";
import { connectDB } from "./database/database";

const iniciarServidor = async () => {
    const { server } = config;
    const HOST = server.host;
    const PORT = server.port;
    await connectDB();

    app.listen(PORT, HOST, () => {
        console.log(`Servidor iniciado en http://${HOST}:${PORT}`);
    });
}

export default iniciarServidor;