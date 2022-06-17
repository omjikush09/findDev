export {};

interface auth{
  userId:string
}

declare global {
  namespace Express {
    interface Request {
      email: string;
      password:string;
      auth:auth
    }
  }
}