import { NextPage } from 'next'
import Head from "next/head"
import {SERVER_URL} from "../config.keys"
// import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import axios from 'axios';
// import { config } from 'process';
import styles from "../styles/signup.module.scss"
import { Container, Grid, IconButton, Typography,TextField,Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
const Login:NextPage =()=>{

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
const submit=async (e:React.FormEvent)=>{
  e.preventDefault();
  const config={
    withCredentials: true
  }
  const user=await axios.post("http://localhost:8000/api/signin",values,config)
  console.log(user,"submit")
}
  return( <>
    <Head>
    {/* <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  /> */}

    </Head>

    <Container fixed={true} maxWidth="xl" className={styles.container}>
    <div  className={styles.container_small}>
      <Grid container >
      <Grid item xs={6} >
ddfsd
        </Grid>
      <Grid item xs={6} >
        <Typography variant="h5" component="h5" align="center">
        Create Account
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
        

         <form onSubmit={submit} className={styles.form}>
         <Typography variant="body1" component="p" align="center" >
       or use your email for registration
        </Typography>
         {/* </> */}
           <TextField id="outlined-basic" label="Email" variant="outlined" className={styles.form_input} value={values.email} onChange={handleChange} name="email" />
            <TextField id="outlined-basic" label="Password" variant="outlined" className={styles.form_input} value={values.password} onChange={handleChange} name="password" />
            <Button variant="outlined">Signup</Button>
          {/* <button>Submit</button> */}
         </form>
         </Grid>
  
          </Grid>
      </div>
        </Container>
        </>
  )
} 
  
  export default Login
































