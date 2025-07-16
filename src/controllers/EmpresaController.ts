import e, { Request, response, Response } from "express";
import { EmpresaServices } from "../services/EmpresaService";

export class EmpresaController {
  private empresaService = new EmpresaServices();

  async create(req: Request, res: Response) {
    const { cnpj, nome_empresa, qtd_minima } = req.body;

    if (!cnpj || !nome_empresa || !qtd_minima) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos." });
    }

    try {
      const empresa = await this.empresaService.create(req.body);
      res.status(201).json(empresa);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
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
        return res.status(404).json({ error: "Empresa não encontrada pelo ID." });
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
        return res.status(404).json({ error: "Empresa não encontrada pelo CNPJ." });
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

    if (!id) return res.status(400).json({ error: "ID não fornecido." });

    try {
      const oldData = await this.empresaService.findById(id)
      const newData = await this.empresaService.update(id, req.body);

      if (!newData) {
        return res.status(404).json({ error: "Não foi possível atualizar os dados da empresa." });
      }
      
      return res.status(200).json({ message: 'Dados da empresa atualizados.', oldData, newData });
    } catch(error: any) {
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

      if(!empresa) return res.status(404).json({ error: "Não foi possível deletar a empresa." });

      return res.status(200).json({ message: 'Empresa deletada', empresa });
    } catch(error: any) {
      res.status(500).json({
        error: "Erro ao deletar empresa.",
        message: error.message,
      }); 
    }
  }
}
