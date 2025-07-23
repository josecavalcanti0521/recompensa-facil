import { Compra } from "../../generated/prisma";
import prisma from "../config/PrismaService";
import { CompraRepository } from "../repositories/CompraRepository";
import { EmpresaServices } from "./EmpresaService";
import { RecompensaServices } from "./RecompensaService";
import { UserServices } from "./UserService";

export class CompraService {
  private compraRespository = new CompraRepository();
  private userService = new UserServices();
  private empresaService = new EmpresaServices();
  private recompensaService = new RecompensaServices()

    async registerCompra(data: {
      valor: number,
      userId: string,
      empresaId?: string
    }): Promise<Compra | null> {

      if (!data.empresaId) {
        throw new Error("empresaId é obrigatório");
      }

      const idUserExists = await this.userService.findById(data.userId);
      if (!idUserExists) {
        throw new Error('ID de usuário não encontrado');
      }

      const empresa = await this.empresaService.findById(data.empresaId);
      if (!empresa) {
        throw new Error("Empresa não encontrada");
      }

      const compra = await this.compraRespository.registerCompra(data);
      if (!compra) return null;

      const totalCompras = await prisma.compra.aggregate({
        _sum: { valor_compra: true },
        where: {
          user_id: data.userId,
          empresa_id: data.empresaId
        }
      });
      const totalGasto = totalCompras._sum.valor_compra || 0;

      const recompensaPendente = await this.recompensaService.getRecompensaPendente(
        data.userId,
        data.empresaId
      );

      if (!recompensaPendente && totalGasto >= empresa.qtd_minima) {
        await this.recompensaService.register({
          descricao: "Recompensa automática por compra",
          resgatada: false,
          user: { connect: { id: data.userId } },
          empresa: { connect: { id: data.empresaId } }
        });
      }

      return compra;
    }

    async findAllCompraById(empresaId: string): Promise<Compra[] | null> {
      const empresaExists = await this.empresaService.findById(empresaId);

      if(!empresaExists) {
        throw new Error('Empresa não encontrado pelo ID');
      }

      const compras = this.compraRespository.findAllCompraById(empresaId);

      if(!compras) return null;

      return compras;
    }
}