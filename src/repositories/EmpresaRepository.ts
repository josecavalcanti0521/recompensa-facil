import { Prisma, Empresa, PrismaClient, Compra } from "../../generated/prisma";
import prisma from "../config/PrismaService";
import IEmpresa from "../interfaces/IEmpresa";

export class EmpresaRepository implements IEmpresa {
  async register(data: Prisma.EmpresaCreateInput): Promise<Empresa> {
    return await prisma.empresa.create({ data });
  }

  async findAll(): Promise<Empresa[]> {
    return await prisma.empresa.findMany();
  }

  async findById(id: string): Promise<Empresa | null> {
    return await prisma.empresa.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCnpj(cnpj: string): Promise<Empresa | null> {
    return await prisma.empresa.findUnique({
      where: {
        cnpj,
      },
    });
  }

  async findByName(nome_empresa: string): Promise<Empresa | null> {
    return await prisma.empresa.findFirst({
      where: {
          nome_empresa,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.EmpresaUpdateInput
  ): Promise<Empresa | null> {
    const empresa = this.findById(id);

    if (!empresa) return null;

    return await prisma.empresa.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<Empresa | null> {
    const empresa = this.findById(id);
    if (!empresa) return null;

    return await prisma.empresa.delete({
      where: {
        id,
      },
    });
  }
}
