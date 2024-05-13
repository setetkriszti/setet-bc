

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;


  return (
    <div
      className="bg-gray-300 rounded-md p-4 text-center
        group hover:bg-white transition-all hover:shadow-md hover:shadow-black/50 "
    >
      <div className="text-center">
        <img
          src={image}
          className="max-h-auto max-h-24 block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="text-2xl mt-4 font-semibold">{name}</h4>
      <p className="text-sm mt-2 text-gray-500">{description}</p>
      <button
        onClick={onAddToCart}
        className="rounded-full px-4 py-2 mt-4 text-white bg-primary"
      >
        {(sizes?.length > 0 || extraIngredientPrices?.length > 0) ? (
            <span>Már {basePrice}€-tól</span>
        ) : (
            <span>Kosárba {basePrice}€</span>
        )}
      </button>
    </div>
  );
}
