import React, { useContext, useEffect } from "react";
import {
  ChevronDownMenuIcon,
  DefaultContact,
  ImageRefreshedIcon,
  VideoCallRefreshedIcon,
  MsgDeleverdIcon,
  MsgDblcheck,
  MsgSendIcon,
  MsgWait,
} from "../../../../../assets/Icons";

// Contexts
import { UIContext } from "../../../../../context/UIContext";
import { ChatContext } from "../../../../../context/ChatContext";
import { AuthContext } from "../../../../../context/AuthContext";
import { SocketContext } from "../../../../../context/SocketContext";
import { MessageContext } from "../../../../../context/MessageContext";

// Hooks
import useChatSocket from "../../../../../hooks/useChatSocket";

const Chat = () => {
  const { HandleJoinChat,HandleUpdateUnreadMessages } = useChatSocket();

  /** Contexts */
  const { chatMessages } = useContext(MessageContext);
  const { user } = useContext(AuthContext);
  const {
    chats,
    setChats,
    selectedChat,
    setSelectChat,
    unReadChatMessages,
    setUnreadChatMessage,
  } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);

  /**  When user clicks a chat */
  const HandleUpdateSelectChat = (chat) => {
    try {
        /** After updating chat unreadmessages to select to update chat*/
        setSelectChat(chat);
        /** Joing socket chat room */
        HandleJoinChat(chat?._id);
    } catch (error) {
        return console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!socket) return;
  
    const handleUpdatedChat = (NewMessage) => {
      setChats((prevChats) => {
        const index = prevChats.findIndex(
          (chat) => chat._id.toString() === NewMessage.chatId.toString()
        );
        if (index === -1) return prevChats;
  
        const updatedChat = {
          ...prevChats[index],
          lastMessage: NewMessage,
          unreadedMessages: prevChats[index].unreadedMessages,
        };
  
        const newChatList = [
          updatedChat,  
          ...prevChats.filter((_, i) => i !== index),
        ];
        return newChatList;
      });
  
      // Unread message update (unique IDs only)
      if (NewMessage?.seen === "DELIVERED") {
        setUnreadChatMessage((prevChats) => ({
          ...prevChats,
          [NewMessage?.chatId?.toString()]:Array.from(
            new Set([...(prevChats[NewMessage?.chatId] || [] ),NewMessage?._id])
          )
        }));
      }
    };
  
    // Attach once
    socket.on("event:updated-chat", handleUpdatedChat);
  
    // Clean up exactly same handler
    return () => {
      socket.off("event:updated-chat", handleUpdatedChat);
    };
  }, [socket]);

  /**  Auto update SEEN status when chat opened */
  useEffect( () => {
    /** Checking if null || [] to not call unread messages */
    if(selectedChat && Array.isArray(unReadChatMessages[selectedChat._id]) && unReadChatMessages[selectedChat._id].length > 0){
      /** Call A socket function to read unreamessages */
      HandleUpdateUnreadMessages(selectedChat._id,unReadChatMessages[selectedChat._id]);
      setUnreadChatMessage( (prevChats) => ({
        ...prevChats,
        [selectedChat._id]:null
      }));
    }
  },[chatMessages])



  /**  Render Chats */
  return (
    <>
      {chats?.map((chat) => (
        <article
          key={chat._id}
          onClick={() => HandleUpdateSelectChat(chat)}
          className={`flex p-[10px_10px_!important] gap-3 ${
            selectedChat?._id === chat?._id
              ? `bg-[#f6f5f4]`
              : `hover:bg-[#f6f5f4]`
          } cursor-pointer rounded-lg p-[8px_8px_8px_0px_!important] group`}
        >
          {/* avatar */}
          <div className="w-[49px] h-[49px] min-w-[49px] min-h-[49px] border border-[#e5e5e5] rounded-full">
            {!chat.members[0].avatar ? (
              <div className="w-full h-full object-center rounded-full bg-neutral-light5 relative">
                <DefaultContact className="w-12 h-12" />
              </div>
            ) : (
              <img
                className="w-full h-full object-cover rounded-full"
                src={chat?.isGroup === true ? chat?.group?.groupAvatar : chat.members[0].avatar}
                alt=""
              />
            )}
          </div>

          {/* message notification or name */}
          <div className="flex-1 w-full">
            {/* name and last message time */}
            <div className="flex justify-between items-center">
              <h2 className="text-[16px] text-[#0a0a0a] font-normal">
                {chat?.isGroup === true ? chat?.group?.name : chat.members[0] .fullname}
              </h2>
              <p className="text-[12px] text-[#686868]">
                {new Date(chat.lastMessage.createdAt).getHours()}:
                {new Date(chat.lastMessage.createdAt).getMinutes()} PM
              </p>
            </div>

            {/* last message & unread counter */}
            {user?._id === chat?.lastMessage?.sender?._id ? (
              // user sent the last message
              <div className="w-full flex">
                <div id="message" className="flex gap-1 items-center">
                  <span>
                    {chat?.lastMessage?.seen === "SEEN" && (<MsgDeleverdIcon className="w-3.5 h-[18px] text-blue-main" />)}
                    {chat?.lastMessage.seen === "PENDING" && (<MsgWait className="text-black-99" />)}
                    {chat?.lastMessage?.seen === "DELIVERED" && ( <MsgDblcheck className="w-3.5 h-[18px] text-black-99" />)}
                    {chat?.lastMessage?.seen === "SENT" && ( <MsgSendIcon className="w-3.5 h-[18px] text-black-99" />)}
                  </span>

                  {chat?.lastMessage?.type === "VIDEO" && (
                    <VideoCallRefreshedIcon className="w-[18px] h-5 text-black-99" />
                  )}
                  {chat?.lastMessage?.type === "IMAGE" && (
                    <ImageRefreshedIcon className="w-[18px] h-5 text-black-99" />
                  )}

                  {chat?.lastMessage?.content?.length > 0 ? (
                    <p
                      id="lastMessage"
                      className="text-[#686868] text-[14px] font-light w-[95%]"
                    >
                      {chat?.isGroup ? (
                        <>
                          You: { chat?.lastMessage?.content?.length > 40 ? chat.lastMessage.content.slice(0,40) + "..." : chat.lastMessage.content}
                        </>
                      ): (
                        <>
                          {chat.lastMessage.content}
                        </>
                      )}
                      
                    </p>
                  ) : (
                    <>
                      {chat?.lastMessage?.type === "VIDEO" && <p>Video</p>}
                      {chat?.lastMessage?.type === "IMAGE" && <p>Image</p>}
                    </>
                  )}
                </div>
                <button>
                  <ChevronDownMenuIcon
                    color="#686868"
                    className="absolute right-[-20px] top-0 transform translate-x-2 opacity-0 transition-all duration-100 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </button>
              </div>
            ) : (
              // user received the last message
              <div className="w-full flex">
                <p
                  id="lastMessage"
                  className="text-[#686868] text-[14px] font-light w-[95%]"
                >
                {chat?.isGroup ? (
                    <>  
                      {
                        chat?.lastMessage.sender?.fullname
                      }: {chat.lastMessage.content}
                    </>
                  ) : (
                    <>
                      {chat.lastMessage.content}
                    </>
                  )}
                </p>

                {/* unread message count */}
                {["SENT", "DELIVERED"].includes(chat?.lastMessage?.seen) && (
                  <>
                    {unReadChatMessages[chat?._id]?.length > 0 && (
                      <>
                        {/* {chat?.unreadedMessages?.length > 0 && ( */}
                          <span className="transition-all duration-150 group-hover:translate-x-[-16px]">
                            <span className="w-4 h-4 font-semibold text-[11px] p-[9px_!important] flex justify-center items-center text-white-e6 rounded-full bg-green-main">
                              {unReadChatMessages[chat?._id]?.length}
                            </span>
                          </span>
                        {/* )} */}
                      </>
                    )}
                  </>
                )}
                <button className="absolute right-0 opacity-0 transition-all duration-150 group-hover:opacity-100">
                  <ChevronDownMenuIcon color="#686868" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </article>
      ))}
    </>
  );
};

export default Chat;
