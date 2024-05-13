"use client";
import Image from "next/image";
import GoogleIcon from "../../../public/google.png";
import { useState } from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const Response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (Response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  
  return (
    <section className="text-center mt-8">
      <h1 className="text-primary text-4xl font-md">Regisztráció</h1>
      {userCreated && (
        <div className="text-center my-4">
          A Regisztráció sikeres. Most már{" "}
          <Link className="underline font-semibold" href={"/login"}>
            bejelentkezhet!
          </Link>
        </div>
      )}
      {error && (
        <div className="text-center my-4">
          A regisztráció sikertelen.
          <br />
          Próbáld újra!
        </div>
      )}
      <form className="block max-w-xs mx-auto mt-8" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="jelszó"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setpassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Regisztáció
        </button>
        <button onClick={()=> signIn('google')}
          className="flex mt-2 justify-center gap-4">
          <Image src={GoogleIcon} width={24} height={24} alt={"Google"} />
          Google
        </button>
        <div className="text-center my-4 pt-4">
          Van már regisztrált fiókod?  <br/>  Kérlek,{" "}
          <Link className="underline" href={"/login"}>
            jelentkezz be!
          </Link>
        </div>
      </form>
    </section>
  );
}
