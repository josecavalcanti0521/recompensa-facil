import { Compra, Empresa, Prisma } from "../../generated/prisma";

export default interface IEmpresa {
  register(data: Prisma.EmpresaCreateInput): Promise<Empresa>;
  findAll(): Promise<Empresa[]>;
  findById(id: string): Promise<Empresa | null>
  findByCnpj(cnpj: string): Promise<Empresa | null>
  findByName(name: string): Promise<Empresa | null>
  update(id: string, data: Prisma.EmpresaUpdateInput): Promise<Empresa | null>
  delete(id: string): Promise<Empresa | null>;
}