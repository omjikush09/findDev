import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { userInfo } from "os";

const prisma =new PrismaClient();

type profession = "student" | "working" |undefined
type availableFor = "hackathon" | "competative_programing" | "dsa" |undefined

export const getFilterUserByLanguage=async(req:Request,res:Response)=>{
    const language=req.query;
    // const {profession,availableFor}=req.query;
   let l=Object.assign({},language);
   console.log(l)

//    l=JSON.parse(JSON.stringify(String(language)));
    if(l.profession){
        console.log("he")
        l.profession=undefined
    }    
    for (const key in l ) {
        //@ts-ignore
        l[key]==="true"?l[key]=true:undefined
        
    }
    console.log(l.profession)
    if(l.availableFor) l.availableFor===undefined
    let profession:profession=undefined;
    if(language.profession){
        profession= language.profession=="student"? "student":"working" 
    }
    let availableFor:availableFor=undefined
    if(language.availableFor){
        availableFor= language.availableFor=="hackathon"?"hackathon":language.availableFor=="dsa"?"dsa":"competative_programing"

    }
    try {
        console.log(profession);
        console.log(availableFor);
        console.log(l)
        const users= await prisma.user.findMany({
            where:{
                    profession
            ,
                availableFor,
            Language:l
           
                
            
        },
        
        
        })
        return res.json(users);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:"Something went wrong"})
    }
    
} 