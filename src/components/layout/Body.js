import Image from "next/image";
import bodyimagePizza from "../../../public/pizza-hawai.png";
import Right from "../icons/Right.js";
import Link from "next/link";

export default function Body() {
  return (
    <section className="body mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold text-primary">
          A jó étel az út <br /> a szívhez
        </h1>
        <p className="my-4 text-2xl text-gray-500">
          A legfinomabb pizzák, hamburgerek és hotdogok várnak rád!
        </p>
        <div className="bg-primary text-white flex items-center gap-2 px-4 py-2 my-4 rounded-full">
          <Link href={'/menu'}>
            RENDELJ MOST!
          </Link>
          <Right />
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image 
          src={bodyimagePizza}
          width={350}
          height={400}
          alt={"pizza"}
        />
      </div>
    </section>
  );
}
