import { useEffect, useState, useRef } from "react";
import { createSocketConnection } from "../redux/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import "./Style.css";
import { capitalizeFirst } from "../utils/utls";
import {IoSend } from "react-icons/io5";
const Chats = () => {
  const [mess, setMess] = useState("");
  const [messList, setMessList] = useState([]);
  const { targeted_user_id } = useParams();
  const {data:user} = useSelector((store) => store.user);
  const { firstName, lastName, photoUrl, _id } = user?.data || {};
  const socket = createSocketConnection();
  const messagesContainerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (!_id && !firstName) {
      return;
    }
    socket.emit("joinchat", { firstName, _id, targeted_user_id });
    socket.on(
      "messRecieved",
      ({ firstName,lastName,photoUrl,userID,targetID,mess,createdAt }) => {
        setMessList((prev) => [
          ...prev,
          { firstName,lastName,photoUrl,userID,targetID,mess,createdAt },
        ]);
      }
    );
    return () => {
      socket.disconnect();
    };
  }, [_id, targeted_user_id]);

  const fetchChat = async (page) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/chat/${targeted_user_id}?page=${page}&limit=20`,
        { withCredentials: true }
      );
      setHasMore(res.data.hasMore);
      const messData = res?.data.messages.map((msg) => {
        return {
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          photoUrl: msg.senderId.photoUrl,
          mess: msg.text,
          userID: msg.senderId._id,
          createdAt: msg.createdAt,
        };
      });
      setMessList((prev) =>[...messData,...prev]);
    } catch (error) {
      console.log("error in fetching chat", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendNewMessage();
    }
  };

  const sendNewMessage = () => {
    socket.emit("sendMessage", {
      firstName,
      lastName,
      photoUrl,
      userID: _id,
      targetID: targeted_user_id,
      mess,
      createdAt: new Date(),
    });
    setMess("");
    setShowEmojiPicker(false);
  };

  const getCUrrentTime = (currTime) => {
    const now = new Date(currTime);
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      hour12: true,
    });
    return time;
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messList]);

  const handleChange = (emojiData) => {
    setMess((prev) => prev + emojiData.emoji);
  };
   const handleScroll = () => {
    const element = messagesContainerRef.current;
    if (element.scrollTop === 0 && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchChat(nextPage);
    }
  };

  return (
    <div className="rounded-md border-gray-700 h-full w-full flex flex-col p-4 ">
      <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto mb-5 hide-scrollbar">
        {messList.length > 0 &&
          messList.map((item, idx) => {
            return (
              <div key={idx} >
                {item?.userID === _id ? (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-5 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={item?.photoUrl}
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {`${capitalizeFirst(item?.firstName)}  ${capitalizeFirst(item?.lastName)}`}
                      <time className="text-xs opacity-50">
                        {getCUrrentTime(item?.createdAt)}
                      </time>
                    </div>
                    <div className="chat-bubble flex max-w-[70%] wrap-anywhere text-sm">
                      {
                        capitalizeFirst(item?.mess)
                      }
                    </div>
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
                      <time className="text-xs opacity-50">
                        {getCUrrentTime(item?.createdAt)}
                      </time>
                    </div>
                    <div className="chat-bubble bottom-0 flex max-w-[70%] wrap-anywhere text-sm">
                      {item?.attachmentType === "image" && item?.attachment ? (
                        <div className="rounded-lg max-w-[200px] max-h-[200px] object-cover">
                          {item.attachment}
                          
                          
                       </div>
                      ) : (
                        item?.mess
                      )}
                    </div>
                    {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="flex items-center justify-between gap-2 p-2 m-auto rounded-md border-gray-700 border-2 w-[90%] mb-2 relative">
        {showEmojiPicker && (
          <div className="absolute bottom-full z-10 mb-2 w-[88%]">
            <EmojiPicker
              height="500px"
              width="100%"
              skinTonePickerLocation="false"
              emojiStyle="google"
              searchPlaceHolder="Search Emoji"
              suggestedEmojisMode="recent"
              onEmojiClick={handleChange}
            />
          </div>
        )}
        <MdOutlineEmojiEmotions
          size={30}
          className="cursor-pointer text-gray-400 "
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        />
        <textarea
          className=" max-h-[25px] w-full border-0 outline-none pl-1"
          type="text"
          name="mess"
          value={mess}
          onChange={(e) => setMess(e.target.value)}
          onKeyDown={handleEnter}
        />
        <div className="flex gap-1">
          <IoSend
            size={20}
            onClick={(e) => sendNewMessage(e)}
            className="cursor-pointer text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
