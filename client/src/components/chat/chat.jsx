import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import Channels from "../channels/channels";

import io from "socket.io-client";
import Members from "../members/members";
import NavBar from "../navbar/navbar";
import ChatContainer from "../chat-container/chat-container";

let socket;

function Chat() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [chat, setChat] = useState([]);
  const [id, setId] = useState("");
  const [members, setMembers] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const [deleteRoom, setDeleteRoom] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admin, setAdmin] = useState([]);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_URL);
    // Connected to socket
    socket.on("connect", () => {
      setId(socket.id);
    });

    const { name, room } = state;
    setName(name);
    setRoom(room);

    socket.on("rooms", rooms => {
      setRooms(rooms);
    });

    //  Join a room
    socket.emit("join", { name, room }, () => {
      setChat([]);
    });

    // Get users from a room
    socket.emit("users", { room }, () => {});

    // Disconnect from socket on component unmount
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [state]);

  useEffect(() => {
    socket.on("admins", roomadmin => {
      setAdmin(roomadmin);
    });
  });

  useEffect(() => {
    socket.on("deleteuser", () => {
      navigate("/javascript", { state: { name, room: "javascript" } });
    });
  });

  useEffect(() => {
    socket.on("users", users => {
      setMembers(users);
    });
  });

  useEffect(() => {
    socket.on("message", data => {
      setChat([...chat, data]);
    });
  }, [chat]);

  const sendMessage = event => {
    event.preventDefault();

    if (message)
      socket.emit("sendMessage", { message, id }, () => setMessage(""));
  };

  const handleNavigation = (event, channelName) => {
    event.preventDefault();

    navigate(`/${channelName}`, {
      state: { name: name, room: channelName },
    });
  };

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleCreateRoom = event => {
    event.preventDefault();
    if (!newRoom) return;
    setIsModalOpen(false);
    navigate(`/${newRoom}`, { state: { name, room: newRoom } });
    setNewRoom("");
  };

  const handleOpenModal = event => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleDelete = deleteroom => {
    setDeleteRoom(deleteRoom);
    socket.emit("delete", { deleteroom }, () => {});
    navigate("/javascript", { state: { name, room: "javascript" } });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setNewRoom("");
  };

  return (
    <div className='mx-auto my-5 h-4/5 w-2/3 rounded-md'>
      <NavBar handleOpenModal={handleOpenModal} />
      <div className='relative flex w-full'>
        <div className='relative flex w-1/5 flex-col gap-4 bg-blue-500 py-3'>
          <Channels
            username={name}
            admins={admin}
            rooms={rooms}
            handleNavigation={handleNavigation}
            deleteRoom={deleteRoom => handleDelete(deleteRoom)}
          />
          <Members members={members} id={id} />
        </div>
        {/* Create Room */}
        {isModalOpen ? (
          <div className='absolute top-1/2 left-1/2 flex w-1/4 -translate-x-1/4 -translate-y-1/2 flex-col items-center rounded bg-gray-100 p-3'>
            <div className='w-full'>
              <div className='mb-3 flex items-center justify-between'>
                <label className='px-1 text-gray-800'>Room</label>
                <IoIosCloseCircle
                  onClick={handleClose}
                  className='cursor-pointer'
                  size='1.5rem'
                />
              </div>
              <input
                className='w-full self-center rounded  border px-2 py-1 text-left text-gray-600 outline-none focus:border-2 focus:border-blue-300'
                onChange={e => {
                  setNewRoom(e.target.value);
                }}
                required
                type='text'
                value={newRoom}
                placeholder='Enter Room Name'
              />
            </div>
            <button
              onClick={handleCreateRoom}
              type='submit'
              className='mt-3 w-full rounded bg-blue-500 py-2 px-3 text-center text-sm font-medium uppercase tracking-wide text-white outline-none'>
              Create Room
            </button>
          </div>
        ) : null}
        {/* Chat container */}
        <div className='h-full w-4/5'>
          <div className='flex h-12 items-center justify-between bg-blue-500 py-2 px-3 text-lg text-white'>
            <span className='font-semibold uppercase tracking-wider'>
              {room}
            </span>
            <span className='rounded-md bg-gray-200 py-2 px-3 text-sm text-black'>
              <span className='font-semibold'>Username: </span>
              <span className='capitalize'>{name}</span>
            </span>
          </div>
          <ChatContainer name={name} id={id} chat={chat} />
          <form className='' onSubmit={sendMessage}>
            <div className='relative mx-auto flex items-center justify-center'>
              <input
                className='w-full self-center rounded border-2 border-gray-400 px-2 py-2 text-left text-gray-600 outline-none focus:border-2 focus:border-blue-300'
                onChange={handleChange}
                value={message}
                type='text'
                name='chat'
                autoComplete='off'
                placeholder='Type a message'
              />
              <button
                className='w-32 rounded bg-blue-500 p-2 font-medium uppercase tracking-wider text-white'
                type='submit'>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
