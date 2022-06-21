import passport from "passport";
import { Request } from "express";
import {Strategy as GoogleStrategy }from "passport-google-oauth20"
import passportJWT from "passport-jwt"
import { GOOGLE_KEY,SERVER_URL,JWT_SECRET } from "../config.keys";
import {PrismaClient} from "@prisma/client"
import {v4 } from "uuid"
const prisma = new PrismaClient();
const ExtractJWT =passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
console.log(GOOGLE_KEY.clientID)

const cookieExtractor = function(req:Request) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies["token"];
        console.log(JSON.stringify(req.cookies));
        console.log(token)
    }
    return token;
};
passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET // Specify a JWT secret in .env file
  },
    async function (jwtPayload, done) {
        console.log('jwt')
      // find the user in db if needed.
      // This functionality may be omitted if you store everything you'll need in JWT payload.
      console.log(jwtPayload)
       const user= await prisma.user.findUnique({
            where:{
                id:jwtPayload.id
            }
        })
        // req.user=user
    //  console.log(user)
      return done(null, user);
    }
  ));



passport.use(new GoogleStrategy({
    clientID: GOOGLE_KEY.clientID,
    clientSecret: GOOGLE_KEY.clientSecret,
    callbackURL: `${SERVER_URL}/api/google/callback`
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
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

