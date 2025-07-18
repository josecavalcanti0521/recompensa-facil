import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post('/register', userController.create.bind(userController));
router.get('/id/:id', userController.findById.bind(userController));
router.get('/email/:email', userController.findByEmail.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

export default router;
