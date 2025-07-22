import { Empresa } from "../../generated/prisma";
import jwt from 'jsonwebtoken';

export async function createTokenEmpresa(empresa: Empresa) {
  const token = jwt.sign({
    id: empresa.id,
    name: empresa.nome_empresa
  }, `${process.env.SECRET_KEY}`);

  return token;
}