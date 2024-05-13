"use client";
import Image from "next/image";
import GoogleIcon from "../../../public/google.png";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true)
    await signIn('credentials', {email, password, callbackUrl: "/"});
    setLoginInProgress(false);
  }
  
  
    return (
    <section className="text-center mt-8">
      <h1 className="text-primary text-4xl font-md">Bejelentkezés</h1>
      <form className="block max-w-xs mx-auto mt-8" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="jelszó"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setpassword(ev.target.value)}
        />
        <button disabled={loginInProgress} type="submit">Bejelentkezés</button>
        <button type="button" onClick={()=> signIn('google', {callbackUrl: "/"})}
        className="flex justify-center mt-2 gap-4">
          <Image src={GoogleIcon} width={24} height={24} alt={"Google"} />
          Google
        </button>
      </form>
    </section>
  );
}
