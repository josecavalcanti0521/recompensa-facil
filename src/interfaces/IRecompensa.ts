import { Prisma, Recompensa } from "../../generated/prisma"

export default interface IRecompensa {
    register(data: Prisma.RecompensaCreateInput): Promise<Recompensa>
    getRecompensaAnyStatus(userId: string, empresaId: string): Promise<Recompensa | null>
    updateResgatada(id: string, resgatada: boolean): Promise<Recompensa>;
    getRecompensaPendente(userId: string, empresaId: string): Promise<Recompensa | null>
}