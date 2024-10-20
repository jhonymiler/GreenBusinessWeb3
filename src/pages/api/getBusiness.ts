import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"; // Verifique o caminho

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('authOptions import:', authOptions); // Verifique se authOptions está definido

  // Recupera a sessão usando getServerSession
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Não autenticado.' });
  }

  if (req.method === 'GET') {

    try {
      const business = await prisma.business.findFirst({
          where: {
              hash: {
                  equals: session.user.address
              }
          }
      });

      if (business) {
          res.status(200).json(business);
          return;
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
