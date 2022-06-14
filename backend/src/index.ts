import express, { Request,Response }  from  "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app=express();

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