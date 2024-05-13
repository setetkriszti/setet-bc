import { cartProductPrice } from "../AppContext";
import Image from "next/image";
import Trash from "../icons/Trash";


export default function CartProduct({product, index, onRemove}){
    return(
        <div className="flex items-center gap-5 mb-2 border-b py-2">
                <div className="w-24"><Image width={240} height={240}  src={product.image} alt={''}/></div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-500">
                      Méret: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Feltét:
                      {product.extras.map((extra) => (
                        <div key={extra._id}>
                          {extra.name} {extra.price}€
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  {cartProductPrice(product)}€
                </div>
                {!!onRemove && (
                    <div className="ml-2">
                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                    >
                      <Trash />
                    </button>
                  </div>
                )}
              </div>
    );
}
