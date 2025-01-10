// import NextAuth from "next-auth/next"
import { LoginResponseType } from "./types/data/User"
// temprorary types
declare module "next-auth" {
    interface Session {
        data: LoginResponseType
    }
}
