import { Router } from "express";
import { CitaController } from "../../../backend/controllers/cita/cita";
import { verifyToken } from "../../middlewares/jwtMiddleware";

const router = Router();

router.post('/',verifyToken, CitaController.create);
router.get('/',verifyToken, CitaController.getAll);
router.put('/:id',verifyToken,CitaController.update)

export default router;