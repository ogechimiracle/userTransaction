"use client";

import { useState, useEffect, useRef } from "react";
import { AiOutlineFilter } from "react-icons/ai";

interface CustomDropdownProps {
  options?: string[];
  onSelect?: (value: string | null) => void;
  defaultLabel?: string;
}

export default function CustomDropdown({
  options = ["ALL","deposit", "withdrawal","transfer", "reward"],
  onSelect,
  defaultLabel = "Filters",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultLabel);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected]);

  const handleSelect = (opt: string) => {
  if (opt === "All") {
    setSelected(defaultLabel);
    onSelect?.(null);   
  } else {
    setSelected(opt);
    onSelect?.(opt);
  }
  setOpen(false);
};
  

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
     
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-gray-300 bg-gray-100 rounded-lg px-4 py-1.5 cursor-pointer hover:bg-gray-200"
      >
        <AiOutlineFilter size={15} />
        <span className="">{selected}</span>
      </button>

      
      {open && (
        <ul className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                handleSelect(opt)
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
