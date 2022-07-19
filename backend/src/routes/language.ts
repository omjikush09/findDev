import express from "express";
import { getFilterUserByLanguage } from "../controllers/language";
import { isSignedIn } from './../controllers/auth';

const router =express.Router();

router.get("/getuserbylanguage",isSignedIn,getFilterUserByLanguage);


export default router;