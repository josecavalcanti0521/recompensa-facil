import { Router } from "express";
import { EmpresaController } from "../controllers/EmpresaController";
import { verifyAuth } from "../middlewares/verify-auth";

const router = Router();

const empresaController = new EmpresaController();

router.post('/register', empresaController.register.bind(empresaController));1
router.post('/login', empresaController.login.bind(empresaController));
router.post('/register-user', verifyAuth, empresaController.registerUser.bind(empresaController));
router.post('/register-compra/:empresaId', verifyAuth, empresaController.registerCompra.bind(empresaController));
router.get('/find-all-compras/:empresaId', verifyAuth, empresaController.findAllCompraById.bind(empresaController))
router.patch('/:id', verifyAuth, empresaController.update.bind(empresaController));
router.get('/', empresaController.findAll.bind(empresaController));

router.get('/id/:id', empresaController.findById.bind(empresaController));
router.get('/cnpj/:cnpj', empresaController.findByCnpj.bind(empresaController));
router.delete('/:id', verifyAuth, empresaController.delete.bind(empresaController));

export default router;