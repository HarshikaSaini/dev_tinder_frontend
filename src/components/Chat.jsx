import { useEffect, useState } from "react";
import { createSocketConnection } from "../redux/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Chats = () => {
  const [mess, setMess] = useState("");
  const [messList, setMessList] = useState([]);
  const { targeted_user_id } = useParams();
  const user = useSelector((store) => store.user);
  const { firstName,lastName,photoUrl ,_id} = user?.data || {};
  const socket = createSocketConnection();

  useEffect(() => {
    if (!_id && !firstName) {
      return;
    }
    socket.emit("joinchat", { firstName, _id, targeted_user_id });
    socket.on("messRecieved", ({ firstName,lastName,photoUrl,mess, userID, createdAt }) => {
      setMessList((prev) => [...prev, {firstName,lastName,photoUrl,mess, userID,createdAt}]);
    });
    return () => {
      socket.disconnect();
    };
  }, [_id, targeted_user_id]);
 
  const fetchChat = async()=>{
   try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/chat/${targeted_user_id}`, {withCredentials:true})
    const messData = res?.data.message.map(msg => {
      return{
        firstName:msg.senderId.firstName,
        lastName:msg.senderId.lastName,
        photoUrl:msg.senderId.photoUrl,
        mess:msg.text,
        userID:msg.senderId._id,
        createdAt:msg.createdAt
      }
    })
    setMessList(messData)
   } catch (error) {
    console.log("error in fetching chat",error)
   }
  }

  useEffect(()=>{
    fetchChat()
  },[])
 
  const handleEnter = (e) =>{
    if(e.key === "Enter"){
      sendNewMessage()
    }
  }

  const sendNewMessage = () => {
    socket.emit("sendMessage", {
      firstName,
      lastName,
      photoUrl,
      userID: _id,
      targetID: targeted_user_id,
      mess,
      createdAt:new Date()
    });
    setMess("");
  };

  const getCUrrentTime = (currTime) => {
    const now = new Date(currTime);
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      hour12: true,
    });
    return time
  }

  return (
    <div className="border-2 rounded-md border-gray-700 h-full w-1/2 m-auto flex flex-col p-2">
      <div className="flex-1 overflow-y-auto mb-5">
        {messList.length > 0 && messList.map((item,idx) => {
          return (
            <>
              {item?.userID === _id ? (
                <div key={idx} className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={item?.photoUrl}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {`${item?.firstName}  ${item?.lastName}`}
                    <time className="text-xs opacity-50">{getCUrrentTime(item?.createdAt)}</time>
                  </div>
                  <div className="chat-bubble">{item?.mess}</div>
                  {/* <div className="chat-footer opacity-50">Delivered</div> */}
                </div>
              ) : (
                <div key={idx} className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={item?.photoUrl}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {`${item?.firstName}  ${item?.lastName}`}
                    <time className="text-xs opacity-50">{getCUrrentTime(item?.createdAt)}</time>
                  </div>
                  <div className="chat-bubble">{item?.mess}</div>
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
        <button onClick={(e) => sendNewMessage(e)} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
