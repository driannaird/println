import axios from "axios";
import { Trash2, Wifi } from "lucide-react";
import validator from "validator";
import { useEffect, useRef, useState } from "react";
import { useIpContext } from "../context/ip";

const PrintList: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setItems] = useState<string[]>([]);
  const { name, update } = useIpContext();

  const [newItem, setNewItem] = useState<string>("");

  const handleDelete = (item: string) => {
    update(item === name ? null : name);
    setItems((prev) => prev.filter((i) => i !== item));
  };

  const checkPrintStatus = async (item: string) => {
    try {
      const response = await axios.get(`http://${item}:6736`);

      const message = response.data.message;
      alert(message);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the server.");
    }
  };

  const handleAddNew = () => {
    if (newItem.trim() && !items.includes(newItem)) {
      if (validator.isIP(newItem)) {
        setItems((prev) => [...prev, newItem]);
        setNewItem("");
      } else {
        alert("Invalid IP Address");
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-64">
      <button
        className="w-full px-4 py-2 text-left border-2 rounded-lg bg-accent/10 border-accent"
        onClick={() => setIsOpen((prev) => !prev)}>
        {name || "Select"}{" "}
        <span
          className={`${
            isOpen && "rotate-180"
          } float-right transition-all duration-300 ease-in-out transform`}>
          ▾
        </span>
      </button>

      <div
        className={`absolute mt-1 p-2 w-full bg-ln rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out transform max-h-48 overflow-y-auto ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}>
        <div className="flex flex-col">
          {items.map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-between w-full px-2 py-2 rounded-lg cursor-pointer text-start hover:bg-primary/40"
              onClick={() => {
                update(item);
                setIsOpen(false);
              }}>
              <p>{item}</p>
              <div className="flex items-center gap-2">
                <button
                  className="group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item);
                  }}>
                  <Trash2
                    className="transition-all group-hover:text-red-500"
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    checkPrintStatus(item);
                  }}>
                  <Wifi size={20} strokeWidth={1.5} />
                </button>
              </div>
            </button>
          ))}
          {items.length === 0 && <p className="text-sm">Empty</p>}
        </div>

        <div className="pt-2 mt-2 border-t border-secondary/20">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="w-full px-2 py-1 bg-transparent border rounded-lg text-secondary border-secondary/50 focus:outline-none"
            placeholder="ip printer server"
          />
          <button
            type="button"
            onClick={handleAddNew}
            className="w-full py-1 mt-2 font-semibold text-white transition-all rounded-lg bg-accent hover:bg-accent/50">
            Add Printer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintList;
