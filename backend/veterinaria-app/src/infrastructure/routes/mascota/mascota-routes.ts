import { Router } from "express";
import { mascotaController } from "../../../backend/controllers/mascota/mascota";

const router = Router();

router.get('/', mascotaController.getAll);
router.post('/', mascotaController.create);

export default router;