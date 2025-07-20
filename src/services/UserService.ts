import { UserRepository } from "../repositories/UserRepository";
import { User, Prisma } from "../../generated/prisma";

export class UserServices{
    private userRepository = new UserRepository();

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const emailExists = await this.userRepository.findByEmail(data.email);

        if(emailExists){
            throw new Error("Email já cadastrado, por favor, utilize outro email.")
        }

        return this.userRepository.create(data);
    }

     async findById(id: string): Promise<User | null>{
        const user = await this.userRepository.findById(id);

        if(!user) return null;

        return user;
     }

    async findByEmail(email: string): Promise<User | null>{
        const user = await this.userRepository.findByEmail(email);

        if(!user) return null

        return user;
    }

     async delete(id: string): Promise<User | null>{
        const user = await this.userRepository.delete(id);

        if(!user) return null;

        return user;
     }

     async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null>{
        const user = await this.userRepository.update(id, data);

        if(!user) return null;

        return user;
     }
}