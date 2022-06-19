import passport from "passport";
import {Strategy as GoogleStrategy }from "passport-google-oauth20"
import { GOOGLE_KEY,SERVER_URL,JWT_SECRET } from "../config.keys";
import {PrismaClient} from "@prisma/client"
import {v4 } from "uuid"
const prisma = new PrismaClient();

console.log(GOOGLE_KEY.clientID)

passport.use(new GoogleStrategy({
    clientID: GOOGLE_KEY.clientID,
    clientSecret: GOOGLE_KEY.clientSecret,
    callbackURL: `${SERVER_URL}/api/google/callback`
  },
  async function(accessToken, refreshToken, profile, cb) {

   try {
    if(!profile._json.email){
        return cb(null,false,{message:"Google Acccout is not registerd with emai. Please sign in with other account"})
    }
    const userUnique=await prisma.user.findUnique({
        where:{email:profile._json.email}
    })

    if((userUnique?.signup!="GOOGLE" && userUnique !=null)){
        console.log(userUnique)
        return cb(null,false,{message:"User is already registred with other method"})
    }
    if(!userUnique){
       const user= await prisma.user.create({
            data:{
                email:profile._json.email,
                id:v4(),
                salt:"d",
                signup:"GOOGLE",
                profile:profile._json.picture
                
            }
        })
        cb(null,user)
    }else{
        cb(null,userUnique)
    }
   } catch (error) {
    return cb(null,false,{message:"unknown error"})
   }
    
  }
));

