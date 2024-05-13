import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import Down from "../icons/Down";
import Up from "../icons/Up";
import { useState } from "react";

export default function MenuItemPriceProp({ name, addLabel, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 mb-2 p-2 rounded-md">
        <div>  
          <button
            onClick={() => setIsOpen(prev => !prev)}
            type="button"
            className="inline-flex p-0 border-0 justify-start"
          >
            {isOpen && <Up />}
            {!isOpen && <Down />}
            <span>{name}</span>
            <span>({props.length})</span>
          </button>
        </div>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props.length > 0 &&
          props.map((size, index) => (
            <div key={size._id} className="flex items-end gap-2">
              <div>
                <label>Név</label>
                <input
                  type="text"
                  placeholder="Méret neve"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <label>Plusz ár</label>
                <input
                  type="text"
                  placeholder="Méret ára"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-2 px-2"
                >
                  <Trash className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center"
        >
          <Plus />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
