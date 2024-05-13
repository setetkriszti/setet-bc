"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import AddresInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('A fizetés sikertelen');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);
  function handleAddresChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }


  async function proceedToCheckout(ev) {
    ev.preventDefault();
     const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Fizetés betöltése...',
      success: 'Fizetés betöltése...',
      error: 'Hiba!',
    })
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">A kosarad üres.</p>
      </section>
    );
  }

 
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Kosár" />
      </div>
      <div className="mt-8 gap-8 grid grid-cols-2">
        <div>
          {cartProducts?.length === 0 && <div>Nincs kiválasztott termék!</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct product={product} key={index} index={index} onRemove={removeCartProduct} />
            ))}
          <div className="py-4 text-right pr-16">
            Összesen:
            <span className="text-lg font-semibold pl-2">{subtotal}€</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Áttekintés</h2>
          <form onSubmit={proceedToCheckout}>
            <AddresInputs
              addressProps={address}
              setAddressProp={handleAddresChange}
            />
            <button type="submit">Fizetés {subtotal}€</button>
          </form>
        </div>
      </div>
    </section>
  );
}

