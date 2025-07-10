import { Empresa, Prisma } from "@prisma/client";

export default interface IEmpresa {
  create(data: Prisma.EmpresaCreateInput): Promise<Empresa>;
  findAll(): Promise<Empresa[]>;
  findById(id: string): Promise<Empresa | null>
  findByCnpj(cnpj: string): Promise<Empresa | null>
  findByName(name: string): Promise<Empresa | null>
  update(id: string, data: Prisma.EmpresaUpdateInput): Promise<Empresa | null>
  delete(id: string): Promise<Empresa | null>;
}