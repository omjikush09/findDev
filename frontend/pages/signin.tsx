import { NextPage } from 'next'
import Head from "next/head"
// import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import axios from 'axios';
// import { config } from 'process';
import styles from "../styles/signup.module.scss"
import { Container, Grid,  Typography } from '@mui/material';


//Import Component
import LoginForm from '../conponents/LoginForm';
const Signin:NextPage =()=>{

  
  return( <>
    <Head>
    {/* <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  /> */}

    </Head>

    <Container maxWidth={false} className={styles.container}>
    <Typography variant='h2' component="h2" align='center'>
           FIND DEV
    </Typography>
    <div  className={styles.container_small}>
        
      <Grid container >
      {/* <Grid item xs={6} >
ddfsd
        </Grid> */}
      <Grid item xs={12} >
        <LoginForm heading='Login'  content='or Login using Email' submitType='signin'/>
        
         </Grid>
        
          </Grid>
      </div>
        </Container>
        </>
  )
} 
  
  export default Signin;
































