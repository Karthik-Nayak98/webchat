import React from "react";
import { Link } from "react-router-dom";
import { FaDesktop } from "react-icons/fa";

function NavBar() {
  return (
    <nav className='bg-blue-500 py-3 px-2 text-white font-medium capitalize flex justify-between'>
      <span className='px-4 text-xl uppercase tracking-wide flex gap-2 items-center justify-center'>
        <FaDesktop />
        WebChat
      </span>
      <Link
        to='/'
        className='capitalize text-sm font-medium bg-gray-200 px-2 py-1 rounded-md text-black'>
        Leave Server
      </Link>
    </nav>
  );
}

export default NavBar;
