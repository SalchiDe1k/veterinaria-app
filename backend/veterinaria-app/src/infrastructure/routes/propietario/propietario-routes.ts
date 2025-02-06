import { Router } from "express";
import { propietarioController } from "../../../backend/controllers/propietario/propietario";
import { verifyToken } from "../../middlewares/jwtMiddleware";

const router = Router();
router.get('/search/:query?', propietarioController.search);

router.get('/',verifyToken,propietarioController.getAll);
router.post('/',verifyToken, propietarioController.create);
router.get('/:id',verifyToken, propietarioController.getById); 
router.put('/:id',verifyToken, propietarioController.update);


export default router;