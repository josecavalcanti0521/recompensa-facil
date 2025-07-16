import { Request, Response } from "express";
import { UserServices } from "../services/UserService";


export class UserController {
    private userService = new UserServices();

    async create(req: Request, res: Response){
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "Todos os campos devem ser preenchidos"});
        
        }

        try{
            const user = await this.userService.create(req.body)
            return res.status(201).json(user);
        }catch(error: any){
            return res.status(500).json({ message: error.message });
        }
    }

    async findById(req: Request, res: Response){
        const {id} = req.params;

        if(!id){
            return res.status(400).json({ error: "ID não fornecido." });
        }

        try{
            const user = await this.userService.findById(id);

            if(!user){
                 return res.status(404).json({ error: "Usuário não encontrado pelo ID." });
            }

            return res.status(200).json(user);
        }catch (error: any) {
        res.status(500).json({
            error: "Erro ao retornar usuário pelo id.",
            message: error.message,
          });
        }
    }

    async findByEmail(req: Request, res: Response){
        const {email} = req.params;

        if(!email){
            return res.status(400).json({error: "Email não fornecido"})
        }

        try{
            const user = await this.userService.findByEmail(email);
            if(!user){
                 return res.status(404).json({ error: "Usuário não encontrado pelo email." });
            }
            return res.status(200).json(user)
        } catch(error: any){
             res.status(500).json({
              error: "Erro ao retornar usuário pelo email.",
              message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;

         if (!id) return res.status(400).json({ error: "ID não fornecido." });

         try{
            const user = await this.userService.delete(id);
            if(!user){
                return res.status(404).json({error: "Não foi possível deletar o usuário."});
            }

            return res.status(200).json({message: "Usuário deletado", user});
         }catch(error: any){
            res.status(500).json({
               error: "Erro ao deletar empresa.",
               message: error.message,
            }); 
         }
    }

    async update(req: Request, res: Response){
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: "ID não fornecido." });

        try{
            const oldData = await this.userService.findById(id);
            const newData = await this.userService.update(id, req.body);

            if (!newData) {
              return res.status(404).json({ error: "Não foi possível atualizar os dados do usuário." });
            }

            return res.status(200).json({ message: 'Dados da empresa atualizados.', oldData, newData });
        }catch(error: any) {
            res.status(500).json({
                error: "Erro ao atualizar os dados da empresa.",
                message: error.message,
            }); 
        }
    }
}