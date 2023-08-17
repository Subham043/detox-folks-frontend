import NextAuth, { NextAuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { axiosPublic } from "../../../../axios";
import { api_routes } from "@/helper/routes";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    debug: true,
    secret: process.env.AUTHSECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                try {
                    const response = await axiosPublic.post(api_routes.login, { ...credentials });
                    return {...response.data.user, token: response.data.token}
                } catch (error: any) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return url
        },
        async jwt({ token, user, account, profile, isNewUser }) {    
            if(token && user){
                token.id = user.id;
                token.verified = user.verified;
                token.phone = user.phone;
                token.token = user.token;
            }    
            return token
        },
        async session({ session, user, token }) {
            if (token && session.user) {
                session.user.phone = token.phone;
                session.user.verified = token.verified;
                session.user.id = token.id;
                session.user.token = token.token;
            }
            return session
        },
    },
    events: {
        async signOut(message: {
            session: Session;
            token: JWT;
        }){
            await axiosPublic.post(api_routes.logout, {}, {
                headers: {"Authorization" : `Bearer ${message.token.token}`}
            });
        }
    },
    pages: {
        signIn: "/login",
        newUser: "/register", // New users will be directed here on first sign in (leave the property out if not of interest)
        // signOut: "/signout",
        error: "/login", // Error code passed in query string as ?error=
        // verifyRequest: "/verify-request", // (used for check email message)
    },
    session: {
        strategy: "jwt",
    },
}

export default NextAuth(authOptions);