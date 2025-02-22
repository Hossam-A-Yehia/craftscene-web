import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import { FiChevronDown } from "react-icons/fi";
import { DropdownProps } from "@/types/Atoms";
import Link from "next/link";

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 transition-opacity duration-300 "
          onClick={() => setIsOpen(false)}
        />
      )}
      <div ref={dropdownRef} className="relative inline-block text-left z-20">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center px-2 mx-1 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200  focus:bg-gray-200 transition duration-200 focus:outline-none  "
        >
          {label}
          <FiChevronDown
            className={`ml-1 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        {isOpen && (
          <div
            className={`${
              items?.length > 10 ? "overflow-y-scroll" : ""
            } max-h-[400px]  absolute right-0 mt-2 w-[230px] bg-white border border-gray-200 rounded-lg shadow-lg z-30 animate-fade-in"
            role="menu`}
          >
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
