import React from "react";
import { FaUsers } from "react-icons/fa";

function Members({ members, id }) {
  return (
    <div className='w-full text-white'>
      <h2 className='px-3 text-xl font-medium flex items-center gap-2'>
        <FaUsers size='1.2rem' className='' />
        Users
      </h2>
      <ul>
        {members.map(member =>
          member.id !== id ? (
            <li key={member.id} className='cursor-pointer capitalize px-6 pb-1'>
              {member.name}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default Members;
