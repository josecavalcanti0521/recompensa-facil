import { User,Prisma } from "../../generated/prisma"

export default interface IUser{
    create(data: Prisma.UserCreateInput): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: string): Promise<User | null>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User | null>;
}