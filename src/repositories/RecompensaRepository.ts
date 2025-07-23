import { Prisma, Recompensa } from "../../generated/prisma";
import prisma from "../config/PrismaService";
import IRecompensa from "../interfaces/IRecompensa";


export class RecompensaRepository implements IRecompensa {
    async register(data: Prisma.RecompensaCreateInput): Promise<Recompensa>{
        return await prisma.recompensa.create({data});
    }


    async  getRecompensaAnyStatus(userId: string, empresaId: string): Promise<Recompensa | null> {
    return await prisma.recompensa.findUnique({
        where: {
        user_id_empresa_id: {
            user_id: userId,
            empresa_id: empresaId,
            },
          },
        });
    }
    
    async updateResgatada(id: string, resgatada: boolean): Promise<Recompensa>{
        return await prisma.recompensa.update({
            where: { id: id },
            data: {resgatada}
        })
    }

    async getRecompensaPendente(userId: string, empresaId: string): Promise<Recompensa | null>{
        return await prisma.recompensa.findFirst({
            where: {
                user_id: userId,
                empresa_id: empresaId,
                resgatada: false
            }
        })
    }
}