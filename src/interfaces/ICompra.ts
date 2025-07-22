import { Compra } from "../../generated/prisma"

export interface ICompra {
  registerCompra(data: {
      valor: number, userId: string, empresaId?: string
    }): Promise<Compra | null>
  findAllCompraById(empresaId: string): Promise<Compra[] | null>;
}