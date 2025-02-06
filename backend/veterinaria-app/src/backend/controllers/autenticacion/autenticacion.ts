import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import { UserService } from "../../../application/services/user/userServices";

const userService = new UserService();

export const AuthenticationController = {
    async login(req: Request, res: Response) {
        
        const { email, password } = req.body;
        const user = await userService.getByEmail(email);

        if (!user) {
            res.status(400).json({ message: user })
            return;
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);
       
        if (!isPasswordValid) {
            res.status(401).json({ message: "Contraseña incorrecta" })
            return;
        };

        const token = generateToken(user.id, user.email);
        res.json({ token });
    }
}

