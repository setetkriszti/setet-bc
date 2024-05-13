"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShopCart from "../icons/ShopCart";
import MenuBars from "../icons/MenuBars";

function ProfileLinks({status}) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Profil
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Kijelentkezés
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Bejelentkezés</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Regisztráció
        </Link>
      </>
    );
  }
}

export default function Headers() {
  const session = useSession();
  const status = session.status;
  const {cartProducts} = useContext(CartContext);
  const [menuBarsOpen, setMenuBarsOpen] = useState(false);
  return (
    <header>
      <div className="flex md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          Étterem
        </Link>
        <div className="flex gap-2 n items-center">
          <button className="p-2" onClick={() =>setMenuBarsOpen(prev => !prev)}>
            <MenuBars />
          </button>
        <Link href={'/cart'} className="relative">
          <ShopCart />
          <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
        </Link>
        </div>
      </div>
      {menuBarsOpen && (
        <div
          onClick={() => setMenuBarsOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'}>Főoldal</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/feedback'}>Visszajelzés</Link>
          <Link href={'/#contact'}>Elérhetőség</Link>
          <ProfileLinks status={status}/>
        </div>
      )}
      <div className="md:flex hidden items-center justify-between">
      <nav className="flex items-center gap-8 font-medium text-gray-500">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          Étterem
        </Link>
        <Link href={"/"}>Főoldal</Link>
        <Link href={"/menu"}>Étlap</Link>
        <Link href={"/feedback"}>Visszajelzés</Link>
        <Link href={"#contact"}>Elérhetőség</Link>
      </nav>
      <nav className="flex gap-4 items-center font-medium text-gray-500">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"}>Profil</Link>
            <button
              onClick={() => signOut()}
              href={"/login"}
              className="bg-primary px-6 py-2 text-white rounded-full"
            >
              Kijelentkezés
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"} className="">
              Bejelentkezés
            </Link>
            <Link
              href={"/register"}
              className="bg-primary px-6 py-2 text-white rounded-full"
            >
              Regisztráció
            </Link>
          </>
        )}
        <Link href={'/cart'} className="relative">
          <ShopCart />
          <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
        </Link>
      </nav>
      </div> 
    </header>
  );
}
