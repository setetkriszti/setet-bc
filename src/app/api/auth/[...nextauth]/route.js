import { User } from "@/models/user";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "src/libs/mongodb";
import GoogleProvider from "next-auth/providers/google";
import { UserInfo } from "@/models/UserInfo";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {label: "Email", type: "email", placeholder: "test@test.com"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
}

export async function isAdmin(){
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo){
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
