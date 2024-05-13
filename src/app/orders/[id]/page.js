"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useParams } from "next/navigation";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";


export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
 

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      fetch('/api/orders?_id=' + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      })
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  
  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Rendelésed" />
        <div className="my-3">
          <p>Köszönjük, hogy minket választottál.</p>
          <p>Jelentkezünk amint a rendelésed elkészült.</p>
        </div>
      </div>
      <div>
        {order && (
          <div className="grid md:grid-cols-2 md:gap-16">
            <div>
              {order.cartProducts.map((product) => (
                <CartProduct key={product._id} product={product} />
              ))}
              <div className="py-4 text-right pr-16">
                Összesen:
                <span className="text-lg font-semibold pl-2">{subtotal}€</span>
              </div>
            </div>
            <div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <AddressInputs disabled={true} addressProps={order} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
