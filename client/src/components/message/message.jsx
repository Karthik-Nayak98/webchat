import React from "react";

function Message({ time, username, payload, index, socketId }) {
  return (
    <div
      key={index}
      className={`flex flex-col rounded-md mb-2 w-52 bg-blue-100 p-2 ${
        payload.id === socketId ? "self-end" : ""
      }`}>
      <div className='flex justify-between'>
        <span className='font-medium text-xs text-pink-500 capitalize'>
          {payload.name}
        </span>
        <span className='text-sm'>{time}</span>
      </div>
      <span className='text-sm px-1' key={index}>
        {payload.text}
      </span>
    </div>
  );
}

export default Message;
