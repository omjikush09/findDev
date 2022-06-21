import {Request,Response} from "express"
import express from "express"
import passport from "passport";
import { loginGithub, loginGoogle, signin, Signup } from "../controllers/auth";
// import authLogin from "../controllers/auth"
const router =express.Router();
import { GOOGLE_KEY,SERVER_URL,JWT_SECRET } from "../config.keys";
import{ hello} from "../controllers/user"



router.post("/signup",Signup)
router.post("/signin",signin)

//Google Login
router.get("/auth/google",hello,passport.authenticate("google",{scope:['profile','email']}));
router.get("/google/callback",loginGoogle)

//Github Login
router.get("/auth/github",passport.authenticate("github",{scope:['user:email']}))
router.get("/auth/github/callback",loginGithub)


export default router;