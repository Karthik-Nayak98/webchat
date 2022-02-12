import React from "react";
import { FaUsers } from "react-icons/fa";

function Members({ members, id }) {
  return (
    <div className='w-full text-white'>
      <h2 className='flex items-center gap-2 px-3 text-xl font-semibold'>
        <FaUsers size='1.2rem' className='' />
        Users
      </h2>
      <ul>
        {members.map(member => (
          <li
            key={member.id}
            className='flex items-center gap-1 rounded px-6 py-1 text-sm capitalize'>
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
