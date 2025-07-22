import { Compra } from "../../generated/prisma";
import prisma from "../config/PrismaService";
import { ICompra } from "../interfaces/ICompra";

export class CompraRepository implements ICompra {
  async registerCompra(data: {
    valor: number;
    userId: string;
    empresaId?: string;
  }): Promise<Compra | null> {
    return await prisma.compra.create({
      data: {
        valor_compra: data.valor,
        user_id: data.userId,
        empresa_id: data.empresaId,
      },
    });
  }
}
