import express from "express";
import { isSignedIn } from '../controllers/auth';
import { getAllUsers, getUser, updateProfile } from './../controllers/user';
import{ hello} from "../controllers/user"
const router =express.Router();


router.get("/getuser",hello,isSignedIn,getUser)
router.put("/updateProfile",isSignedIn,updateProfile)

router.get("/getallusers",isSignedIn,getAllUsers)

export default router;