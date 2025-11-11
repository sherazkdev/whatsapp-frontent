import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UIContext } from "../context/UIContext";
import { ChatContext } from "../context/ChatContext";
import { MessageContext } from "../context/MessageContext";

const useChatSocket = () => {
  /** Contexts */
  const { socket } = useContext(SocketContext);
  const {chats,setChats,selectedChat,setSelectChat} = useContext(ChatContext);
  const {chatMessages,setChatMessages} = useContext(MessageContext);

  const [NewMessage, SetNewMessage] = useState(null);
  const [TypingIndicater, SetTypingIndicater] = useState(false);

  // Attach listeners once socket exists
  useEffect(() => {
    if (!socket) console.log(socket);

    const handleNewMessage = (data) => SetNewMessage(data);
    const handleTyping = () => SetTypingIndicater(true);
    const handleStopTyping = () => SetTypingIndicater(false);

    socket.on("event:new-message", (NewMessage) => {
      SetNewMessage(NewMessage);
      return true;
    });
    socket.on("event:typing", handleTyping);
    socket.on("event:stop-typing", handleStopTyping);
    socket.on("event:joined-room", (info) => console.log(info));
    socket.on("event:updated-messages-seen-statues",({unReadedMessagesIds,chatId}) => {
    setChats( (prevChats) => {
        const findedChatIndex = prevChats?.findIndex( (chat) => chat._id?.toString() === chatId?.toString());
        console.log(findedChatIndex)
        const updatedChat = {
          ...prevChats[findedChatIndex],
          lastMessage:{
            ...prevChats[findedChatIndex]?.lastMessage,
            seen:"SEEN"
          },
          unreadedMessages:null
        };
        const newestChats = [
          updatedChat,
          ...prevChats.filter( (chat) => chat?._id?.toString() !== chatId?.toString())
        ];
        return newestChats;
    })
    setChatMessages( (prevChatMessages) => {
        const updatedMessages = prevChatMessages?.map( (msg) => {
          if(unReadedMessagesIds.includes(msg?._id?.toString())){
            return {...msg,seen:"SEEN"}
          }else{
            return msg;
          }
        });
        return updatedMessages;
    })
  });

    return () => {
      socket.off("event:new-message", handleNewMessage);
      socket.off("event:typing", handleTyping);
      socket.off("event:stop-typing", handleStopTyping);
      socket.off("event:joined-room");
      socket.off("event:updated-messages-seen-statues");
    };
  }, [socket]);

  // emitters
  const HandleJoinChat = (chatId) => socket?.emit("join-chat", {chatId});
  const HandleUpdateUnreadMessages = (chatId,unReadedMessagesIds) => socket.emit("update-messages-seen-statuses",{chatId,unReadedMessagesIds});
  const HandleIsTypingUser = (userId, chatId) => socket?.emit("typing-indicater", { userId, chatId });
  const HandleStopTypingUser = (userId, chatId) => socket?.emit("stop-typing-indicater", { userId, chatId });

  return {
    NewMessage,
    HandleJoinChat,
    HandleIsTypingUser,
    HandleStopTypingUser,
    TypingIndicater,
    HandleUpdateUnreadMessages
  };
};

export default useChatSocket;
