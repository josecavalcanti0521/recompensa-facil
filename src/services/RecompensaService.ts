import { Prisma, Recompensa } from "../../generated/prisma";
import { RecompensaRepository } from "../repositories/RecompensaRepository";

export class RecompensaServices {
    private recompensaRepository = new RecompensaRepository();

    async register(data: Prisma.RecompensaCreateInput): Promise<Recompensa>{
        const recompensa = await this.recompensaRepository.register(data);

        return recompensa
    }

    async  getRecompensaAnyStatus(userId: string, empresaId: string): Promise<Recompensa | null>{
        const exists = await this.recompensaRepository.getRecompensaAnyStatus(userId, empresaId);

        return exists;
    }

    async updateResgatada(id: string, resgatada: boolean): Promise<Recompensa>{
        const alreadyGet = await this.recompensaRepository.updateResgatada(id,resgatada);

        return alreadyGet;
    }

    async getRecompensaPendente(userId: string, empresaId: string): Promise<Recompensa | null>{
        const exists = await this.recompensaRepository.getRecompensaPendente(userId,empresaId);

        return exists;
    }


}