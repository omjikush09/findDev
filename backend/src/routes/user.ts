import express from "express";
import { isSignedIn } from '../controllers/auth';
import { getUser } from './../controllers/user';
import{ hello} from "../controllers/user"
const router =express.Router();


router.get("/getuser",hello,isSignedIn,getUser)


export default router;