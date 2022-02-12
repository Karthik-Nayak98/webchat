import React from "react";
import { Link } from "react-router-dom";
import { FaDesktop } from "react-icons/fa";

function NavBar({ handleOpenModal }) {
  return (
    <nav className='flex justify-between bg-blue-600 py-3 px-2 font-medium capitalize text-white'>
      <span className='flex items-center justify-center gap-2 px-4 text-xl uppercase tracking-wide'>
        <FaDesktop />
        WebChat
      </span>
      <div className='flex gap-4'>
        <button
          onClick={handleOpenModal}
          className='rounded-md bg-green-200 p-2 text-sm font-medium capitalize text-black'>
          Create Room
        </button>
        <Link
          to='/'
          className='rounded-md bg-red-200 p-2 text-sm font-medium capitalize text-black'>
          Leave Server
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
