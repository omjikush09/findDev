import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express"

const prisma=new PrismaClient();
export const getUser=async(req:Request,res:Response)=>{
    const userId=req.auth.userId
    const user=await prisma.user.findUnique({
        where:{
            id:userId
        }
    })

    return res.json({user})
}