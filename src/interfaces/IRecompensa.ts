import { Prisma, Recompensa } from "../../generated/prisma"

export default interface IRecompensa {
    register(data: Prisma.RecompensaCreateInput): Promise<Recompensa>
    findByUserAndEmpresa(userId: string, empresaId: string): Promise<Recompensa | null>
    updateResgatada(id: string, resgatada: boolean): Promise<Recompensa>;
    
}