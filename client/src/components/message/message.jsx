import React from "react";

function Message({ text, username, name, index }) {
  return (
    <div
      key={index}
      className={`flex flex-col rounded-md mb-2 w-52 bg-blue-100 p-2 ${
        username === name ? "self-end" : ""
      }`}>
      <div>
        <span className='font-medium text-xs text-pink-500 capitalize'>
          {name}
        </span>
        <span>{}</span>
      </div>
      <span className='text-sm px-1' key={index}>
        {text}
      </span>
    </div>
  );
}

export default Message;
