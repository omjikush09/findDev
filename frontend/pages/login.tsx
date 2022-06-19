import { NextPage } from 'next'
import {SERVER_URL} from "../config.keys"
// import type { AppProps } from 'next/app'

const Login:NextPage =()=>{

  const handleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      window.open(`${SERVER_URL}/api/auth/${"google"}`, "_self");
  }


  return( <div>
    <button onClick={handleClick}>sign in with google</button>
  </div>
  )
} 
  
  export default Login
































