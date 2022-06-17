import { Request,Response } from "express";
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"
import {v4 } from "uuid"
import jwt from "jsonwebtoken"
import {expressjwt} from "express-jwt"
// import { isSignedIn } from './auth';
const prisma = new PrismaClient();


export const  Signup = async (req:Request,res:Response)=>{
    console.log(req.body.email)
    const allUser=await prisma.user.findUnique({
        where:{email:req.body.email}
    })
    console.log(allUser)
    if(allUser!=null){
        return res.status(400).json({error:"User Already exist"})
    }
     await prisma.user.create({
        data:{
            email:req.body.email,
            password:generatHash(req.body.password),
            id:v4(),
            salt:"d",
            signup:"CUSTOM"
        }
    })
    return res.send("hello")
}

export const signin= async (req:Request,res:Response)=>{
    const user= await prisma.user.findUnique({
        where:{
            email:req.body.email
        }
    })
    if(!user){
        return res.status(400).json({error:"User deos not exist"})
    }
    const check=bcrypt.compareSync(req.body.password,user.password)
    if(!check){
        return res.status(401).json({error:"Email and password deos not match"})
    }
    const secret=process.env.SECRET!
    const token=jwt.sign({userId:user.id},secret, { expiresIn: 60 * 60 })
    res.cookie('token',token,{httpOnly:true})
    res.status(200).json({success:"SignIn Successfully",token})
}

// export const isSignedIn=(req:Request,res:Response)=>{
//      const token=req.cookies.token;
//      if(!token){
//         return res.status(401).json({error:"Token not found"})
//      }
//      console.log(token)
//      return expressjwt({ secret: process.env.SECRET!, algorithms: ["HS256"],getToken:token })
// }
// const getTOken=(req:Request,res:Response)

export const isSignedIn=expressjwt({ secret: process.env.SECRET!, algorithms: ["HS256"],getToken:(req)=>{
    if(req.cookies.token){
        return req.cookies.token
    }
    return null
} })
//hashing password sychrousnly  
export const generatHash=(password:string):string=>{
    
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
        
    return hash
}
