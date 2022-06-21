// import 
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Axios from "axios"

const LoginSuccess:NextPage=()=>{

    const [user,setUser]=useState({})
    useEffect(() => {
        const config={
            // headers:{
            // }
            withCredentials: true
          }
        const user=Axios.get("http://localhost:8000/api/getuser",config)
        setUser(user)
    
    }, [])
    


    return (<div>
            <>
            login Success 
  
            </>
        </div>)
}

export default LoginSuccess