import { Request } from "express"

export function getEmpresaByToken(req: Request): {id: string, name: string } | null {
  const user = req.user;

  if(user && typeof user !== "string") {
    return typeof user.id === "string" ? { id: user.id, name: user.name } : null;
  }

  return null;
}
