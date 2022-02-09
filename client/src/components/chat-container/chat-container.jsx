import React, { useEffect, useRef } from "react";
import Message from "../message/message";

const getDate = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.slice(-2);

  return `${hours}:${minutes}`;
};

function ChatContainer({ chat, name, id }) {
  const messageEl = useRef();

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <div
      ref={messageEl}
      className='flex h-96 w-full flex-col overflow-x-hidden overflow-y-scroll p-3'>
      {chat.map((payload, index) =>
        payload.name ? (
          <Message
            key={index}
            index={index}
            username={name}
            payload={payload}
            time={getDate()}
            socketId={id}
          />
        ) : (
          <div
            key={index}
            className='mb-2 w-80 self-center rounded-md bg-yellow-200 py-1 px-2 text-center text-sm'>
            <span className='font-medium'>{payload.text}</span>
          </div>
        )
      )}
    </div>
  );
}

export default ChatContainer;
