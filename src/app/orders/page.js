"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import { timeDate } from "src/libs/timedate";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState("");
  const { loading, data:profile } = useProfile();

  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
      });
    });
  }, []);

  if (loading) {
    return "Betöltés...";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={profile.admin} className="max-w-3xl mx auto" />
      <div className="mt-8 max-w-2xl mx-auto">
      <div className="my-4 bg-gray-300 rounded-lg p-2 w-24">
        <Link href={"/statistics"}>Statisztika</Link>
      </div>
        {orders?.length > 0 &&
          orders.map((order) => (
            <div key={order._id} className="md:flex bg-gray-200 mb-2 rounded-lg p-2">
              <div className="flex gap-4 items-center grow">
                <div className="flex gap-8">
                  <div>{order.userEmail}</div>
                  <div className="text-gray-500">{timeDate(order.createdAt)}</div>
                </div>
              </div>
              <div className="flex gap-4">
              <div
                  className={
                    (order.paid ? "bg-green-500" : "bg-red-500") +
                    ' p-2 rounded-md text-white w-24 items-center'
                  }
                >
                  <span>{order.paid ? "Fizetett" : "Kifizetetlen"}</span>
                </div>
                <div className="justify-end flex gap-2 items-center">
                <Link href={"/orders/" + order._id} className="button">
                  Több..
                </Link>
              </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
