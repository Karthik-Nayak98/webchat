import React from "react";

import { FaSlackHash, FaPython, FaJava } from "react-icons/fa";

import { BsChatDotsFill } from "react-icons/bs";
import { IoLogoJavascript } from "react-icons/io5";
import { SiCplusplus } from "react-icons/si";
import { DiRuby } from "react-icons/di";
import { useNavigate } from "react-router-dom";

function Channels({ socket, name, room }) {
  const navigate = useNavigate();

  const handleNavigation = (event, channelName) => {
    event.preventDefault();

    socket.emit("join", { name, room }, callback => {
      //   Error callback function
      //   console.log("joined the room");
    });
    navigate(`/channels/${channelName}`);
  };
  return (
    /* Display different channels */
    <div className='w-full text-white'>
      <h2 className='px-3 text-lg font-bold flex items-center gap-2 mb-1'>
        <BsChatDotsFill size='1.2rem' className='' />
        Channels
      </h2>
      <ul className='px-3'>
        <li
          onClick={event => handleNavigation(event, "javascript")}
          className='flex items-center gap-1 cursor-pointer text-sm'>
          <IoLogoJavascript />
          JavaScript
        </li>
        <li
          onClick={event => handleNavigation(event, "python")}
          className='flex items-center cursor-pointer gap-1 text-sm'>
          <FaPython />
          Python
        </li>
        <li
          onClick={event => handleNavigation(event, "java")}
          className='flex items-center cursor-pointer gap-1 text-sm'>
          <FaJava />
          Java
        </li>
        <li
          onClick={event => handleNavigation(event, "c++")}
          className='flex items-center cursor-pointer gap-1 text-sm'>
          <SiCplusplus />
          C++
        </li>
        <li
          onClick={event => handleNavigation(event, "ruby")}
          className='flex items-center cursor-pointer gap-1 text-sm'>
          <DiRuby />
          Ruby
        </li>
      </ul>
    </div>
  );
}

export default Channels;
