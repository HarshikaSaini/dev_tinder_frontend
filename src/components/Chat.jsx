import { useEffect, useState } from "react";
import { createSocketConnection } from "../redux/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chats = () => {
  const [mess, setMess] = useState("");
  const [messList, setMessList] = useState([]);
  const { targeted_user_id } = useParams();
  const user = useSelector((store) => store.user);
  const { firstName, _id } = user?.data || {};
  const socket = createSocketConnection();

  useEffect(() => {
    if (!_id && !firstName) {
      return;
    }
    socket.emit("joinchat", { firstName, _id, targeted_user_id });
    socket.on("messRecieved", ({ firstName, mess, userID }) => {
      setMessList((prev) => [...prev, { firstName, mess, userID }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [_id, targeted_user_id]);

  const handleEnter = () =>{
    
  }

  const sendNewMessage = () => {
    socket.emit("sendMessage", {
      firstName,
      userID: _id,
      targetID: targeted_user_id,
      mess,
    });
    setMess("");
  };

  const getCUrrentTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return time
  }
 
  return (
    <div className="border-2 rounded-md border-gray-700 h-full w-1/2 m-auto flex flex-col p-2">
      <div className="flex-1 overflow-y-auto mb-5">
        {messList.map((item) => {
          return (
            <>
              {item.userID === _id ? (
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
                    {item.firstName}
                    <time className="text-xs opacity-50">{getCUrrentTime()}</time>
                  </div>
                  <div className="chat-bubble">{item.mess}</div>
                  {/* <div className="chat-footer opacity-50">Delivered</div> */}
                </div>
              ) : (
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
                    {item.firstName}
                    <time className="text-xs opacity-50">{getCUrrentTime()}</time>
                  </div>
                  <div className="chat-bubble">{item.mess}</div>
                  {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
                </div>
              )}
            </>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 p-2 m-auto rounded-md border-gray-700 border-2 w-[90%] mb-2">
        <input
          className=" h-[40px] w-full border-0 outline-none pl-1"
          type="text"
          name="mess"
          value={mess}
          onChange={(e) => setMess(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button onClick={sendNewMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
