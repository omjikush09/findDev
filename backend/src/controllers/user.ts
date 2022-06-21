import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express"

const prisma=new PrismaClient();
export const getUser=async(req:Request,res:Response,user:any)=>{
    // const userId=req.auth.userId
    console.log(JSON.stringify(req.user))
  
    // const user=await prisma.user.findUnique({
    //     where:{
    //         id:userId
    //     }
    // })

    return res.send("hello")
}


export const hello=(req:Request,res:Response,next:CallableFunction)=>{
    console.log('hello')
// console.log(GOOGLE_KEY.clientID)
    console.log(JSON.stringify(req.cookies))
// console.log(req.cookies)
    next()
    // res.send("middlreware")
}
