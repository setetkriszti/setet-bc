'use client';
import Image from "next/image";
import LeftHalfHamb from "../../../public/halfhamb1.png";
import RightHalfHamb from "../../../public/halfhamb2.png";
import MenuItem from "../menu/MenuItem.js";
import { useEffect } from "react";
import { useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  
  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section>
      <div className="absolute w-full left-0 right-0 justify-start">
        <div className="absolute left-0 -top-[140px]  text-left -z-10">
          <Image
            src={LeftHalfHamb}
            width={350}
            height={550}
            alt={"lefthalfhamb"}
          />
        </div>
        <div className="absolute right-0 -top-[140px] text-left -z-10">
          <Image
            src={RightHalfHamb}
            width={350}
            height={550}
            alt={"righthalfhamb"}
          />
        </div>
      </div>
      <div className="text-center text-3xl text-primary font-semibold my-24 italic">
        <h2>Kóstold meg változatos ételeinket!</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item}/>
        ))}
      </div>
    </section>
  );
}
