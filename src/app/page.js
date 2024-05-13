import Body from "@/components/layout/Body.js"
import HomeMenu from "@/components/layout/HomeMenu.js";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Body />
      <HomeMenu />
      <section id="about">
        <div>
          <h2 className="text-center text-3xl text-primary font-semibold mt-20 italic">
            Tudj meg többet rólunk!
          </h2>
        </div>
        <div className="flex-col gap-4 text-center text-xl mt-6 text-gray-500 max-w-4xl mx-auto">
          <p>
            Üdvözöllek! Egy kis csapatként indultunk, akiknek közös szenvedélye
            volt az étel és az emberek boldoggá tétele. Mindannyian különböző
            hátterekkel rendelkeztünk, de az ízek és az étel szeretete hozott
            össze minket.
          </p>
          <p>
            A történetünk a konyha mélyéről kezdődött, ahol kísérleteztünk és
            alkottunk. Mindegyik étel egy történet volt, egy emlék, ami
            különleges volt számunkra. Ahogy azonban egyre többen érdeklődtek az
            általunk készített ételek iránt, úgy döntöttünk, hogy megosztjuk az
            ízek élményét a világgal.
          </p>
          <p>
            Minden egyes nappal tovább fűszerezzük az életet és az ételeket.
            Köszönjük, hogy része vagy ennek a kulináris utazásnak!<br/>Legyenek az
            ízek mindig veled
          </p>
        </div>
      </section>
      <section id="contact">
        <div>
          <h2 className="text-center text-3xl text-primary font-semibold mt-14 italic">
            Állunk rendelkezésedre!
          </h2>
        </div>
        <div className="text-center text-2xl underline text-gray-500 font-semibold mt-4">
          <a href="tel:+670 000 000">+0670 000 000</a>
        </div>
        <div className="text-center mt-4 underline">
        <Link href={"/email"}>Vedd fel velünk a kapcsolatot emailben.</Link>
        </div>
      </section>
    </>
  );
}
