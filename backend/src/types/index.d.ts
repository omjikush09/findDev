export {};

interface auth{
  id:string
}

declare global {
  namespace Express {
    interface Request {
      email: string;
      password:string;
      auth:auth
     
      
    }
    interface User {
      // *username:string;
      // yourVariable: any;
      id?:string
  }
  }
}