import { Prisma, Recompensa } from "../../generated/prisma";
import { RecompensaRepository } from "../repositories/RecompensaRepository";
import { EmpresaServices } from "./EmpresaService";

export class RecompensaServices {
    private recompensaRepository = new RecompensaRepository();
    private empresaService = new EmpresaServices()

    async register(data: Prisma.RecompensaCreateInput): Promise<Recompensa>{
        const recompensa = await this.recompensaRepository.register(data);

        return recompensa
    }

    async  getRecompensaAnyStatus(userId: string, empresaId: string): Promise<Recompensa | null>{
        const empresaid = this.empresaService.findById(empresaId);

        if(!empresaid){
            return null;
        }

        const exists = await this.recompensaRepository.getRecompensaAnyStatus(userId, empresaId);

        return exists;
    }

    async updateResgatada(id: string, resgatada: boolean): Promise<Recompensa>{
        const alreadyGet = await this.recompensaRepository.updateResgatada(id,resgatada);

        return alreadyGet;
    }

    async getRecompensaPendente(userId: string, empresaId: string): Promise<Recompensa | null>{
        const empresaid = this.empresaService.findById(empresaId);

        if(!empresaid){
            return null;
        }
        const exists = await this.recompensaRepository.getRecompensaPendente(userId,empresaId);

        return exists;
    }


}