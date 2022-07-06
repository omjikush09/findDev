import React,{useState} from "react"
import styles from "./LoginForm.module.scss";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import {IconButton, Typography,TextField,Button } from '@mui/material';
import axios from 'axios';

import {SERVER_URL} from "../config.keys"
// interface submit{
//     (e: React.FormEvent)
// }
const LoginForm=({heading="",content="",submitType=""})=>{

    const [values,setValues]=useState({
        email:"tffffwf@at.com",
        password:"satat"
      })
    const handleClick=(e:React.MouseEvent<HTMLButtonElement>,type:string)=>{
        e.preventDefault();
        window.open(`${SERVER_URL}/api/auth/${type}`,"_self");
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setValues({...values,[e.target.name]:e.target.value})
    }
  const submit=async (e:React.FormEvent,type:string)=>{
    e.preventDefault();
    const config={
      withCredentials: true
    }
    if(type="signup"){

      const user=await axios.post("http://localhost:8000/api/signin",values,config)
    }else if(type="signin"){

    }
    // console.log(user,"submit")
  }


    return (
        <>
        <Typography variant="h5" component="h5" align="center">
       {heading}
        </Typography>
        <div className={styles.social}> 

      <IconButton color="primary" component="button" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handleClick(e,"google")} >
        <GoogleIcon htmlColor='#1158F2'/>
      </IconButton>
      <IconButton color="primary" component="button" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handleClick(e,"github")} >
        <GitHubIcon htmlColor='black'/>
      </IconButton>
        </div>
        {/* <button sign in with google</button> */}
          {/* <button onClick={(e)=>handleClick(e,"github")}>sign in with github</button> */}
        

         <form onSubmit={(e)=>submit(e,submitType)} className={styles.form}>
         <Typography variant="body1" component="p" align="center" >
            {content}
        </Typography>
         {/* </> */}
           <TextField id="outlined-basic" label="Email" variant="outlined" className={styles.form_input} value={values.email} onChange={handleChange} name="email" />
            <TextField id="outlined-basic" label="Password" variant="outlined" className={styles.form_input} value={values.password} onChange={handleChange} name="password" />
            <Button variant="outlined" type='submit' >Signup</Button>
          {/* <button>Submit</button> */}
         </form>
        </>
    )
}

export default LoginForm;