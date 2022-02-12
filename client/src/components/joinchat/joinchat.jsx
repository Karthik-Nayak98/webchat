import React, { useState } from "react";
import { Link } from "react-router-dom";

function JoinChat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("javascript");

  return (
    <div className='mx-auto mt-20 w-11/12 max-w-md rounded-lg border border-gray-200 p-4 shadow-xl shadow-slate-200'>
      <h1 className='text-center text-2xl font-bold uppercase text-blue-400'>
        web Chat
      </h1>
      <div className='mb-2 flex flex-col items-start justify-center gap-3'>
        <div className='w-full'>
          <label className='px-1 text-gray-800'>Username</label>
          <input
            className='w-full self-center rounded  border px-2 py-2 text-left text-gray-600 outline-none focus:border-2 focus:border-blue-300'
            onChange={e => {
              setName(e.target.value);
            }}
            required
            type='text'
            value={name}
            placeholder='Enter Name'
          />
        </div>
        {/* <div className='w-full'>
          <label className='px-1 text-gray-800'>Select Room</label>
          <select
            onChange={e => setRoom(e.target.value)}
            value={room}
            className='focus:border-focus:border-blue-300 w-full rounded border p-2 outline-none'>
            <option>JavaScript</option>
            <option>React</option>
            <option>Python</option>
            <option>Ruby</option>
            <option>Perl</option>
          </select>
        </div> */}
      </div>
      <Link
        onClick={name.length <= 0 ? e => e.preventDefault() : null}
        to={`/${room}`}
        state={{ name, room }}>
        <button
          type='submit'
          className='mt-3 w-full rounded bg-blue-500 p-2 font-medium uppercase tracking-wider text-white'>
          Join
        </button>
      </Link>
    </div>
  );
}

export default JoinChat;
