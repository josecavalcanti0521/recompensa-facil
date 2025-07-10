import { Router } from "express";
import { EmpresaController } from "../controllers/EmpresaController";

const router = Router();

const empresaController = new EmpresaController();

router.post('/', empresaController.create.bind(empresaController));
router.get('/', empresaController.findAll.bind(empresaController));
router.get('/id/:id', empresaController.findById.bind(empresaController));
router.get('/cnpj/:cnpj', empresaController.findByCnpj.bind(empresaController));
router.patch('/:id', empresaController.update.bind(empresaController));
router.delete('/:id', empresaController.delete.bind(empresaController));

export default router;