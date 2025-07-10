import { Empresa, Prisma } from "@prisma/client";
import { EmpresaRepository } from "../repositories/EmpresaRepository";
import IEmpresa from "../interfaces/IEmpresa";

export class EmpresaServices {
  private empresaRepository = new EmpresaRepository();

  async create(data: Prisma.EmpresaCreateInput): Promise<Empresa | null> {
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

    return this.empresaRepository.create(data);
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
