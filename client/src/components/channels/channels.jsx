import React from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
const Channels = ({
  deleteRoom,
  username,
  admins,
  rooms,
  handleNavigation,
}) => {
  return (
    <div className='w-full text-white'>
      <h2 className='mb-1 flex items-center gap-2 px-3 text-lg font-bold'>
        <BsChatDotsFill size='1.2rem' className='' />
        Channels
      </h2>
      <ul>
        {rooms.map((room, index) => {
          const i = admins?.findIndex(
            admin =>
              admin.name.toLowerCase() === username.toLowerCase() &&
              admin.room.toLowerCase() === room.toLowerCase()
          );
          return (
            <span className='flex items-center' key={index}>
              <li
                key={index}
                onClick={event => handleNavigation(event, room.toLowerCase())}
                className='flex cursor-pointer items-center gap-1 rounded px-6 py-1 text-sm hover:bg-blue-300 hover:bg-opacity-90'>
                {room}
              </li>
              {i >= 0 ? (
                <MdDelete
                  className='cursor-pointer'
                  onClick={() => deleteRoom(room)}
                />
              ) : null}
            </span>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
