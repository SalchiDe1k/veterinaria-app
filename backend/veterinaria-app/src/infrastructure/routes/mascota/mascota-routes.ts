import { Router } from "express";
import { mascotaController } from "../../../backend/controllers/mascota/mascota";
import { verifyToken } from "../../middlewares/jwtMiddleware";

const router = Router();
router.get('/search/:query?', verifyToken, mascotaController.searchByPropietarioID);
router.get('/', verifyToken, mascotaController.getAll);
router.post('/', verifyToken, mascotaController.create);
export default router;