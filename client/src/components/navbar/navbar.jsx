import React from "react";
import { Link } from "react-router-dom";
import { FaDesktop } from "react-icons/fa";

function NavBar() {
  return (
    <nav className='flex justify-between bg-blue-500 py-3 px-2 font-medium capitalize text-white'>
      <span className='flex items-center justify-center gap-2 px-4 text-xl uppercase tracking-wide'>
        <FaDesktop />
        WebChat
      </span>
      <Link
        to='/'
        className='rounded-md bg-gray-200 px-2 py-1 text-sm font-medium capitalize text-black'>
        Leave Server
      </Link>
    </nav>
  );
}

export default NavBar;
