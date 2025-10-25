import { useState } from "react";

const Chats = () => {
  const [mess, setMess] = useState("");
  return (
    <div className="border-2 rounded-md border-gray-700 h-full w-1/2 m-auto flex flex-col p-2">
      <div className="flex-1">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 p-2 m-auto rounded-md border-gray-700 border-2 w-[90%] mb-2">
        <input
          className=" h-[40px] w-full border-0 outline-none pl-1"
          type="text"
          name="mess"
          value={mess}
          onChange={(e) => setMess(e.target.value)}
        />
        <button onClick={()=> setMess("")} className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chats;
