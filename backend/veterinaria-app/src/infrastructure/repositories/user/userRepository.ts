import { StatusCodes } from "http-status-codes";
import { UsuariosModel } from "../../database/models/usuarios/usuarioModel";
import { ResponseException } from "../../exceptions/responseException";

export class UsuarioRepository {

    async existById(id: string): Promise<boolean> {
        try {
            const propietario = await UsuariosModel.findById(id);
            return propietario !== null; // Retorna true si encuentra, false si no.
        } catch (error) {
            throw new ResponseException(StatusCodes.BAD_REQUEST, [
                `Error al verificar existencia del propietario por ID: ${error.message}`,
            ]);
        }
    }
    async getByEmail(email: string): Promise<any> {
        try {
            return await UsuariosModel
                .findOne({ email: email });
        } catch (error) {
            throw new ResponseException(StatusCodes.BAD_REQUEST, [
                `Error al obtener el usuario por email: ${error.message}`,
            ]);
        }
    }
}
