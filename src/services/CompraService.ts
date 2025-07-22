import { Compra } from "../../generated/prisma";
import { CompraRepository } from "../repositories/CompraRepository";
import { EmpresaServices } from "./EmpresaService";
import { UserServices } from "./UserService";

export class CompraService {
  private compraRespository = new CompraRepository();
  private userService = new UserServices();
  private empresaService = new EmpresaServices();

    async registerCompra(data: {
        valor: number, userId: string, empresaId?: string
      }): Promise<Compra | null>{
        const idUserExists = await this.userService.findById(data.userId)
        
        // const empresaExists = this.empresaService.findById(data.empresaId);

        if(!idUserExists) {
          throw new Error('ID de usuário não encontrado');
        }

        const compra = await this.compraRespository.registerCompra(data);
  
        if(!compra) return null
  
        return compra;
      }
}