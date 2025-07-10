import { Prisma, User } from "../../generated/prisma";
import prisma from "../config/PrismaService";
import IUser from "../interfaces/IUser";


export class UserRepository implements IUser{
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({data});
    }

    async findById(id: string): Promise<User | null>{
        return await prisma.user.findById({
            where: {
                id,
            }
        })
    }

    async findByEmail(email: string): Promise<User | null>{
        return await prisma.user.findByEmail({
            where: {
                email,
            }
        })
    }

    async delete(id: string): Promise<User | null>{
        const user = await this.findById(id);
        if(!user) return null;

        return await prisma.user.delete({
            where: {
                id,
            }
        })
    }

     async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
        const user = await this.findById(id);
        if (!user) return null;

        return await prisma.user.update({
         where: { id },
            data
         });
    }
}