import { Request, Response } from "express";
import { Empresa, Prisma } from "../../generated/prisma";
import { EmpresaRepository } from "../repositories/EmpresaRepository";
import { createTokenEmpresa } from "../helpers/create-token-empresa";

export class EmpresaServices {
  private empresaRepository = new EmpresaRepository();

  async register(data: Prisma.EmpresaCreateInput): Promise<{empresa: Empresa, token: string}> {
    const cnpjExists = await this.empresaRepository.findByCnpj(data.cnpj);
    const nameExists = await this.empresaRepository.findByName(data.nome_empresa);

    if (data.qtd_minima <= 0) {
      throw new Error("A quantidade mínima deve ser maior que zero.");
    }

    if (cnpjExists) {
      throw new Error("CNPJ já cadastrado.");
    }

    if (nameExists) {
      throw new Error("Empresa já cadastrado.");
    }
    
    const empresa = await this.empresaRepository.register(data);

    const token = await createTokenEmpresa(empresa);

    return { empresa, token }
  }

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.findAll();
  }

  async findById(id: string): Promise<Empresa | null> {
    const empresa = await this.empresaRepository.findById(id);

    if (!empresa) return null;

    return empresa;
  }

  async findByCnpj(cnpj: string): Promise<Empresa | null> {
    const empresa = await this.empresaRepository.findByCnpj(cnpj);
    
    if (!empresa) return null;

    return empresa;
  }

  async findByName(nome_empresa: string): Promise<Empresa | null> {
    const empresa = await this.empresaRepository.findByName(nome_empresa);
    console.log();
    
    if(!empresa) return null;

    return empresa;
  }

  async update(id: string, data: Prisma.EmpresaUpdateInput): Promise<Empresa | null> {
    const empresa = await this.empresaRepository.update(id, data);

    if(!empresa) return null;

    return empresa;
  }

  async delete(id: string): Promise<Empresa | null> {
    const empresa = await this.empresaRepository.delete(id);

    if(!empresa) return null;

    return empresa;
  }
}
