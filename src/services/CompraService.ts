import { Compra } from "../../generated/prisma";
import { CompraRepository } from "../repositories/CompraRepository";

export class CompraService {
  private comprRespository = new CompraRepository();

    async registerCompra(data: {
        valor: number, userId: string, empresaId?: string
      }): Promise<Compra | null>{
        const compra = await this.comprRespository.registerCompra(data);
  
        if(!compra) return null
  
        return compra;
      }
}