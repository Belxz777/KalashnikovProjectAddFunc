'use client'
import React from 'react'
import { useState } from 'react';
import { BsDisplay,BsGlobeCentralSouthAsia,BsHexagonHalf,BsInfoCircleFill,BsKeyFill } from "react-icons/bs";
type Props = {}

const Menu = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10  bg-white rounded-lg shadow-md   ">
    <button
      onClick={handleToggleMenu}
      className="py-2 px-4 bg-orange-400 hover:bg-fuchsia-600 "
    >
      Искать по направлению
    </button>

    {isOpen && (
      <>
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-red-200  inline">
            <a href="#" className=" flex pr-4">
              IT   <BsDisplay/>
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-red-200">
            <a href="#" className="flex pr-4">
             Kosmos  <BsGlobeCentralSouthAsia/>
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-red-200">
            <a href="#" className="flex pr-4">
           Prom Dizain <BsHexagonHalf/>
            </a>
          </li>
        </ul>
        <div className="px-4 py-2 ext-b rounded-b-md">
          <a href="https://example.com" className='flex pr-4'>Частые вопросы  <BsInfoCircleFill/></a>
        </div>
        <div className="px-4 py-2 ext-b rounded-b-md">
          <a  className='text-sm flex pr-4'>Политика конфиденциальности <BsKeyFill/> </a>
        </div>
        </>
    )}
  </div>
);
};
export default Menu;