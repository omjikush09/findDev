// var GoogleStrategy = require('passport-google-oauth20').Strategy;
import { Request,Response } from "express";
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"
import {v4 } from "uuid"
import jwt from "jsonwebtoken"
import {expressjwt} from "express-jwt"
import passport from "passport";
import {JWT_SECRET } from "../config.keys";
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
    const check=bcrypt.compareSync(req.body.password,user.password!)
    if(!check){
        return res.status(401).json({error:"Email and password deos not match"})
    }
    const secret=process.env.SECRET!
    const token=jwt.sign({id:user.id},secret, { expiresIn: 60 * 60 *60})
    res.cookie('token',token)
    console.log("in signin")
    res.status(200).json({success:"SignIn Successfully",token})
}

export const isSignedIn=passport.authenticate("jwt",{session:false})
   

// const getTOken=(req:Request,res:Response)

// export const isSignedIn=expressjwt({ secret: process.env.SECRET!, algorithms: ["HS256"],getToken:(req)=>{
//     if(req.cookies.token){
//         return req.cookies.token
//     }
//     return null
// } })

//hashing password sychrousnly  
export const generatHash=(password:string):string=>{
    
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
        
    return hash
}



export const loginGoogle = function (req:Request, res:Response, next:CallableFunction) {
    passport.authenticate('google', { session: false }, (err, user, info) => {
      // Decide what to do on authentication
      if (err || !user) {
        return res.redirect(process.env.CLIENT_URL + '/login?error=' + info.message)
      }
      req.login(user, { session: false }, (err:any) => {
        if (err) {
          res.status(400).send({ err });
        }
        var payload = { id: user.id }
        const token = jwt.sign(payload,JWT_SECRET,{ expiresIn: 60 * 60 *60});
        var cookiePayload =   {token }
        res.cookie('token', token,{httpOnly:true,  expires: new Date(Date.now() + 90000000),domain:"localhost"});
        res.redirect(process.env.CLIENT_URL + '/loginsuccess')
      })
    })(req, res, next)
}

export const loginGithub = function (req:Request, res:Response, next:CallableFunction) {
    passport.authenticate('github', { session: false }, (err, user, info) => {
      // Decide what to do on authentication
      console.log(err)
      if (err || !user) {
        return res.redirect(process.env.CLIENT_URL + '/login?error=' + info.message)
      }
      req.login(user, { session: false }, (err:any) => {
        if (err) {
          res.status(400).send({ err });
        }
        var payload = { id: user.id }
        const token = jwt.sign(payload,JWT_SECRET,{ expiresIn: 60 * 60 *60});
        var cookiePayload =   {token }
        res.cookie('token', token,{httpOnly:true,  expires: new Date(Date.now() + 90000000),domain:"localhost"});
        res.redirect(process.env.CLIENT_URL + '/loginsuccess')
      })
    })(req, res, next)
}






