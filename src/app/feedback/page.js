"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function FeedbackPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [answerone, setAnswerone] = useState("");
  const [answertwo, setAnswertwo] = useState("");
  const [answerthree, setAnswerthree] = useState("");
  const [answerfour, setAnswerfour] = useState("");

  const questionone = "Hogyan értékelné a weboldalunk átláthatóságát és felhasználóbarát jellegét?";
  const questiontwo = "Mennyire volt egyszerű és zökkenőmentes a rendelési folyamat?";
  const questionthree = "Milyen érzéseket váltott ki Önben a rendelési folyamat? (pl. biztonság, kényelem, elégedettség";
  const questionfour = "Hogyan értékelné az étlapunk választékát és az ételek/italok minőségét?";


  async function handleFeedbackSubmit(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          message: message,
          questionone: questionone,
          questiontwo: questiontwo,
          questionthree: questionthree,
          questionfour: questionfour,
          answerone: answerone,
          answertwo: answertwo,
          answerthree: answerthree,
          answerfour: answerfour,
        }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Visszajelzés küldése...",
      success: "Köszönjük a visszajelzést!",
      error: "Hiba!",
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <form onSubmit={handleFeedbackSubmit}>
        <div className="text-center">
          <SectionHeaders mainHeader="Visszajelzés" />
        </div>
        <div>
          <div>
            <label>Név</label>
            <input
              onChange={(ev) => setFullName(ev.target.value)}
              value={fullName}
              type="text"
              placeholder="Név"
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              onChange={(ev) => setEmail(ev.target.value)}
              value={email}
              type="email"
              placeholder="Email"
            />
            </div>
            </div>
            <div className="mt-4 shadow-md px-3 py-2 border border-slate-300 rounded-xl">
              <div>
                <h2>{questionone}</h2>
              </div>
              <div className="mt-2">
                <ul> 
                  <li   className="flex gap-2">
                    <input
                      type="radio"
                      name="egy"
                      id="rad1"
                      value="Nagyon átlátható és könnyen kezelhető"
                      onChange={(ev) => setAnswerone(ev.target.value)}
                    />
                    <label htmlFor="rad1">Nagyon átlátható és könnyen kezelhető</label>
                  </li>
                  <li   className="flex gap-2">
                    <input
                      type="radio"
                      name="egy"
                      id="rad2"
                      value="Elfogadható, de vannak javítani való pontok"
                      onChange={(ev) => setAnswerone(ev.target.value)}
                    />
                    <label htmlFor="rad2">Elfogadható, de vannak javítani való pontok</label>
                  </li>
                  <li   className="flex gap-2">
                    <input
                      type="radio"
                      name="egy"
                      id="rad3"
                      value="Zavaros és nehezen kezelhető"
                      onChange={(ev) => setAnswerone(ev.target.value)}
                    />
                    <label htmlFor="rad3">Zavaros és nehezen kezelhető</label>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 shadow-md px-3 py-2 border border-slate-300 rounded-xl">
              <div>
                <h2>{questiontwo}</h2>
              </div>
              <div className="mt-2">
                <ul> 
                  <li   className="flex gap-2">
                <input
                  type="radio"
                  name="kettő"
                  id="rad1"
                  value="Nagyon egyszerű és gyors volt"
                  onChange={(ev) => setAnswertwo(ev.target.value)}
                />
                <label htmlFor="rad1">Nagyon egyszerű és gyors volt</label>
                </li>
                <li   className="flex gap-2">
                <input
                  type="radio"
                  name="kettő"
                  id="rad2"
                  value="Elfogadható, de néhány lépésben elakadtam"
                  onChange={(ev) => setAnswertwo(ev.target.value)}
                />
                <label htmlFor="rad2">Elfogadható, de néhány lépésben elakadtam</label>
                </li>
                <li   className="flex gap-2">
                <input
                  type="radio"
                  name="kettő"
                  id="rad3"
                  value="Nehézkes volt és sok időt vett igénybe"
                  onChange={(ev) => setAnswertwo(ev.target.value)}
                />
                <label htmlFor="rad3">Nehézkes volt és sok időt vett igénybe</label>
                </li>
                </ul>
                </div>
                </div>
           
           
            <div className="mt-4 shadow-md px-3 py-2 border border-slate-300 rounded-xl">
              <div>
                <h2>{questionthree}</h2>
              </div>
              <div className="mt-2">
                <ul> 
                  <li   className="flex gap-2">
                <input
                  type="radio"
                  name="harom"
                  id="rad1"
                  value="Biztonságosnak éreztem a rendelést"
                  onChange={(ev) => setAnswerthree(ev.target.value)}
                />
                <label htmlFor="rad1">Biztonságosnak éreztem a rendelést</label>
                </li>
                <li   className="flex gap-2">
                <input
                  type="radio"
                  name="harom"
                  id="rad2"
                  value="Kényelmetlen volt, de végül elégedett voltam"
                  onChange={(ev) => setAnswerthree(ev.target.value)}
                />
                <label htmlFor="rad2">Kényelmetlen volt, de végül elégedett voltam</label>
                </li>
                <li   className="flex gap-2">
                <input
                  type="radio"
                  name="harom"
                  id="rad3"
                  value="Nem voltam elégedett a rendelési folyamattal"
                  onChange={(ev) => setAnswerthree(ev.target.value)}
                />
                <label htmlFor="rad3">Nem voltam elégedett a rendelési folyamattal</label>
                </li>
                </ul>
              </div>
              </div>
            
            
            <div className="mt-4 shadow-md px-3 py-2 border border-slate-300 rounded-xl">
              <div>
                <h2>{questionfour}</h2>
              </div>
              <div className="mt-2">
                <ul> 
                  <li   className="flex gap-2">
                <input
                  type="radio"
                  name="negy"
                  id="rad1"
                  value="Nagyon elégedett voltam a választékkal és minőséggel"
                  onChange={(ev) => setAnswerfour(ev.target.value)}
                />
                <label htmlFor="rad1">Nagyon elégedett voltam a választékkal és minőséggel</label>
                </li>
                <li   className="flex gap-2">
                <input
                  type="radio"
                  name="negy"
                  id="rad2"
                  value="Elfogadható volt, de van még fejlődési lehetőség"
                  onChange={(ev) => setAnswerfour(ev.target.value)}
                />
                <label htmlFor="rad2">Elfogadható volt, de van még fejlődési lehetőség</label>
                </li>
                <li   className="flex gap-2">
                <input
                  type="radio"
                  name="negy"
                  id="rad3"
                  value="Nem voltam elégedett sem a választékkal, sem a minőséggel"
                  onChange={(ev) => setAnswerfour(ev.target.value)}
                />
                <label htmlFor="rad3">Nem voltam elégedett sem a választékkal, sem a minőséggel</label>
                </li>
                </ul>
              </div>
              </div>
              <div>
            <div className="flex flex-col gap-2 mt-2">
              <label>Üzenet</label>
              <textarea
                onChange={(ev) => setMessage(ev.target.value)}
                value={message}
                className="shadow-md px-3 py-2 border border-slate-300 rounded-xl"
                id="message"
                placeholder="Ird meg a gondolataid."
              ></textarea>
            </div>
            <button className="mt-4" type="submit">
              Küldés
            </button>
          </div>
      </form>
    </section>
  );
}
