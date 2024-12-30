import { Router } from "express";
import { propietarioController } from "../../../backend/controllers/propietario/propietario";

const router = Router();

router.get('/', propietarioController.getAll);
router.post('/', propietarioController.create);

export default router;