import {Request,Response} from "express"
import express from "express"
import passport from "passport";
import { loginFacebook, signin, Signup } from "../controllers/auth";
// import authLogin from "../controllers/auth"
const router =express.Router();
import { GOOGLE_KEY,SERVER_URL,JWT_SECRET } from "../config.keys";

const hello=(req:Request,res:Response,next:CallableFunction)=>{
    console.log('hello')
console.log(GOOGLE_KEY.clientID)
    next()

}


router.post("/signup",Signup)
router.post("/signin",signin)

//Google Login
router.get("/auth/google",hello,passport.authenticate("google",{scope:['profile','email']}));
router.get("/google/callback",loginFacebook)



export default router;