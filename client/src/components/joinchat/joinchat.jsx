import React, { useState } from "react";
import { Link } from "react-router-dom";

function JoinChat() {
  const [name, setName] = useState("");
  return (
    <div className='rounded-lg max-w-md mt-20 p-4 mx-auto w-11/12 shadow-xl border border-gray-200 shadow-slate-200'>
      <h1 className='uppercase text-center text-blue-400 text-2xl font-bold'>
        web Chat
      </h1>
      <div className='mb-2 flex justify-center items-start flex-col gap-1'>
        <label className='px-1 text-gray-800'>Username</label>
        <input
          className='w-full self-center text-gray-600 outline-none rounded border px-2 py-2 text-left outline-none: focus:border-2 focus:border-blue-300'
          onChange={e => {
            setName(e.target.value);
          }}
          type='text'
          value={name}
          placeholder='Enter Name'
        />
      </div>
      <Link
        onClick={!name ? e => e.preventDefault() : null}
        to='/chat'
        state={{ name }}>
        <button
          type='submit'
          className='w-full bg-blue-500 rounded uppercase tracking-wider text-white font-medium p-2 mt-3'>
          Join
        </button>
      </Link>
    </div>
  );
}

export default JoinChat;
