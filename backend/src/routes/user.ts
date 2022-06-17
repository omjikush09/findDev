import express from "express";
import { isSignedIn } from '../controllers/auth';
import { getUser } from './../controllers/user';
const router =express.Router();


router.get("/getuser",isSignedIn,getUser)

export default router;