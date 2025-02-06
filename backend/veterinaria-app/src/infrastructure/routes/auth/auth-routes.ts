import { Router } from "express";
import { AuthenticationController } from "../../../backend/controllers/autenticacion/autenticacion";

const router = Router();

router.post('/',AuthenticationController.login);

export default router;