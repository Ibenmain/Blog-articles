import { User as authUser, Session as authSession } from 'next-auth'
import { JWT as authJWT } from 'next-auth/jwt'


export interface User extends authUser {
    id?: string;
    username?: string;
}

export interface Session extends authSession {
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  
export interface JWT extends authJWT {
  id?: string
  username?: string
  password?: string
}