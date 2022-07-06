import express, { Request,Response }  from  "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser"
const app=express();
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user"
import  passport  from 'passport';
import cors from "cors"
import "./service/passport"
import { GOOGLE_KEY,SERVER_URL,JWT_SECRET,CLIENT_URL } from "./config.keys";
console.log(GOOGLE_KEY.clientID)
console.log(SERVER_URL)

app.use(cors({
    origin:CLIENT_URL,
    credentials: true,
}))

app.use(cookieParser())
const options={
    swaggerDefinition:{
       
        info:{
            title:"testting Swagger",
            version:"1.0.0"
        }
    },
    apis:["./dist/index.js"]
}
const swaggerSpecification= swaggerJSDoc(options);
//Routes
/**
 * @swagger
 * /:
 *  get:
 *     description: Welcon to swagger doc!
 *     responses:
 *      200:
 *         description: Returns string
 * 
 */
app.use(express.json());
//Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use(passport.initialize())
app.get("/",(req:Request,res:Response)=>{
    return res.send("hello")
})

app.get("/get",(req:Request,res:Response)=>{
    return res.send("get")
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));


const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})