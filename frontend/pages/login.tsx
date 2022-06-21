import { NextPage } from 'next'
import {SERVER_URL} from "../config.keys"
// import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import axios from 'axios';
import { config } from 'process';

const Login:NextPage =()=>{

    const [values,setValues]=useState({
      email:"tffffwf@at.com",
      password:"satat"
    })
  const handleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      window.open(`${SERVER_URL}/api/auth/${"google"}`,"_self");
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
  return( <div>
    <button onClick={handleClick}>sign in with google</button>
    <form onSubmit={submit}>
      <input type="text" value={values.email} onChange={handleChange} name="email" />
      <input type="text" value={values.password} onChange={handleChange} name="password" />
      <button>Submit</button>
    </form>
  </div>
  )
} 
  
  export default Login
































