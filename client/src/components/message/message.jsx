import React from "react";

function Message({ time, username, payload, index, socketId }) {
  return (
    <div
      key={index}
      className={`mb-2 flex w-52 flex-col ${
        payload.id === socketId ? "self-end" : ""
      }`}>
      <span className='rounded-md bg-blue-200 p-2 text-sm' key={index}>
        {payload.text}
      </span>
      <div className='flex justify-between'>
        <span className='px-2 text-xs font-medium capitalize text-pink-500'>
          {payload.id === socketId ? "You" : payload.name}
        </span>
        <span className='pr-2 text-sm'>{time}</span>
      </div>
    </div>
  );
}

export default Message;
