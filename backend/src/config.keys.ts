import 'dotenv/config';

export const GOOGLE_KEY={
        clientID:process.env.GOOGLE_CLIENT_ID ||  " ",
        clientSecret:process.env.GOOGLE_CLIENT_SECRET || " "
}

export const SERVER_URL=process.env.SERVER_URL || " "
export const JWT_SECRET=process.env.JWT_SECRET || " "
export const CLIENT_URL=process.env.CLIENT_URL || " " 
