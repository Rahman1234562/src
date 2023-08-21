import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { getByEmail, verifyPassword } from "@/components/service/user";
export const authOptions = {
  // Configure one or more authentication providers
    session: {
       jwt:  true,

    },
    providers: [
        CredentialsProvider({
           name: 'Credential',
           async authorize({email, password}){
            const user = getByEmail(email);
            if(!user){
                throw new Error("user don't exit")
            }
            const isValid = await verifyPassword(password, user.password)
            if(!isValid){
                throw new Error("incorrect possword")
            }
            return{email}
           }
        })

    ]

}
export default NextAuth(authOptions)