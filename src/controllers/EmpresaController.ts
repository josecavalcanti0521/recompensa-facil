import { Request, Response } from "express";
import { EmpresaServices } from "../services/EmpresaService";
import bcrypt from "bcrypt";
import { UserServices } from "../services/UserService";
import { CompraService } from "../services/CompraService";
import { getEmpresaByToken } from "../helpers/get-empresa-by-token";
import { RecompensaServices } from "../services/RecompensaService";

export class EmpresaController {
  private empresaService = new EmpresaServices();
  private userService = new UserServices();
  private compraService = new CompraService();
  private recompensaService = new RecompensaServices()

  async register(req: Request, res: Response) {
    const { cnpj, nome_empresa, qtd_minima, password, confirmPassword } =
      req.body;

    if (!cnpj) {
      return res
        .status(400)
        .json({ message: "CNPJ da empresa é obrigatório." });
    }

    if (!nome_empresa) {
      return res
        .status(400)
        .json({ message: "Nome da empresa é obrigatório." });
    }

    if (!qtd_minima) {
      return res.status(400).json({
        message: "Quantidade mínima de compras da empresa é obrigatório.",
      });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Senha é da empresa é obrigatória." });
    }

    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: "Confirmação de senha da empresa é obrigatória." });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const data = {
      cnpj,
      nome_empresa,
      qtd_minima,
      password: passwordHash,
    };

    try {
      const empresa = await this.empresaService.register(data);
      res.status(201).json(empresa);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { cnpj, password } = req.body;

    if (!cnpj) {
      return res
        .status(400)
        .json({ message: "CNPJ da empresa é obrigatório." });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Senha é da empresa é obrigatória." });
    }

    try {
      const { token, id } = await this.empresaService.login(cnpj, password);
      res.status(201).json({ token, id });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const empresas = await this.empresaService.findAll();
      return res.status(200).json(empresas);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID não fornecido." });

    try {
      const empresa = await this.empresaService.findById(id);

      if (!empresa) {
        return res
          .status(404)
          .json({ error: "Empresa não encontrada pelo ID." });
      }

      return res.status(200).json(empresa);
    } catch (error: any) {
      res.status(500).json({
        error: "Erro ao retornar empresa pelo id.",
        message: error.message,
      });
    }
  }

  async findByCnpj(req: Request, res: Response) {
    const { cnpj } = req.params;

    if (!cnpj) return res.status(400).json({ error: "CNPJ não fornecido." });

    try {
      const empresa = await this.empresaService.findByCnpj(cnpj);

      if (!empresa) {
        return res
          .status(404)
          .json({ error: "Empresa não encontrada pelo CNPJ." });
      }

      return res.status(200).json(empresa);
    } catch (error: any) {
      res.status(500).json({
        error: "Erro ao retornar empresa pelo CNPJ.",
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { cnpj, nome_empresa, qtd_minima, password, confirmPassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const data = {
      cnpj,
      nome_empresa,
      qtd_minima,
      password: hashPassword,
    }

    const empresa = getEmpresaByToken(req);

    if (!id) return res.status(400).json({ error: "ID não fornecido." });

    if(id !== empresa?.id) return res.status(400).json({ error: "O ID fornecido não está compatível com o ID do Token." });

    try {
      const oldData = await this.empresaService.findById(id);
      const newData = await this.empresaService.update(id, data);

      if (!newData) {
        return res
          .status(404)
          .json({ error: "Não foi possível atualizar os dados da empresa." });
      }

      return res
        .status(200)
        .json({ message: "Dados da empresa atualizados.", oldData, newData });
    } catch (error: any) {
      res.status(500).json({
        error: "Erro ao atualizar os dados da empresa.",
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID não fornecido." });

    try {
      const empresa = await this.empresaService.delete(id);

      if (!empresa)
        return res
          .status(404)
          .json({ error: "Não foi possível deletar a empresa." });

      return res.status(200).json({ message: "Empresa deletada", empresa });
    } catch (error: any) {
      res.status(500).json({
        error: "Erro ao deletar empresa.",
        message: error.message,
      });
    }
  }

  async registerUser(req: Request, res: Response) {
    const { name, email } = req.body;

    if (!name) {
      return res
        .status(422)
        .json({ message: "Nome do usuário é obrigatório." });
    }

    if (!email) {
      return res
        .status(422)
        .json({ message: "Email do usuário é obrigatório." });
    }

    const data = {
      name,
      email,
    };

    try {
      const user = await this.userService.create(data);

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso.", user });
    } catch (error: any) {
      return res
        .status(500)
        .json({
          message: "Ocorre um erro na criação de usuário.",
          error: error.message,
        });
    }
  }

  async registerCompra(req: Request, res: Response) {
    const { valor, userId } = req.body;
    const { empresaId } = req.params;
    
    if(!valor){
      return res
          .status(400)
          .json({ error: "Valor da compra é obrigatório." });
    }

    if(!userId){
      return res
          .status(400)
          .json({ error: "ID do usuário é obrigatório." });
    }

    try {
      const compra = await this.compraService.registerCompra({
        valor: Number(valor),
        userId,
        empresaId,
      });

      if(!compra){
        return res
          .status(400)
          .json({ error: "Erro ao registrar a compra!", });
      }

      return res.status(201).json(compra);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao registrar compra.", error: error.message });
    }
  }

  async findAllCompraById(req: Request, res: Response) {
    const { empresaId } = req.params;

    if(!empresaId) {
      return res.status(422).json({ message: 'Para retornar todas as compras deu uma empresa é necessário o ID.' })
    }
    
    const empresa = getEmpresaByToken(req);

    if(!empresa) {
      return res.status(401).json({ message: "Empresa não autenticada." });
    }

    try {
      const compras = await this.compraService.findAllCompraById(empresaId);

      return res.status(200).json({ empresa: empresa.name, compras})
    } catch(error: any) {
      return res.status(404).json({ message: 'Erro ao retornar todas a compras de uma empresa pelo ID;', error: error.message })
    }
  }

  async updateResgatada(req: Request, res: Response){
    const { recompensaId } = req.params;

    if(!recompensaId){
      return res.status(404).json({message: "Recompensa não encontrada"})
    }

    try{
      const recompensaUpdated = await this.recompensaService.updateResgatada(recompensaId,true)

      return res.status(200).json({
      message: "Recompensa resgatada com sucesso",
      recompensa: recompensaUpdated,
    });

    }catch (error: any) {
       return res.status(500).json({ error: error.message });
    }
  }
}
