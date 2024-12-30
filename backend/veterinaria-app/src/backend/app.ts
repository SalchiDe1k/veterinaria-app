import iniciarServidor from "../infrastructure/server";

try {
    iniciarServidor();
} catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error.message);
    process.exit(1);
}