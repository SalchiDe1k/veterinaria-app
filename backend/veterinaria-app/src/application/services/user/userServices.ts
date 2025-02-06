import { UsuarioRepository } from "../../../infrastructure/repositories/user/userRepository";

export class UserService {
    private _userRepository = new UsuarioRepository();

    async getByEmail(email: string): Promise<any> {
        return await this._userRepository.getByEmail(email);
    }


}