import React, { useContext, useEffect, useRef, useState } from 'react';

// Icons
import {Mic,ArchiveRefreshed, SendFilledIcon} from "../../../../../../../assets/Icons"
import { useForm } from 'react-hook-form';
import useSendMessage from '../../../../../../../hooks/useSendMessage';
import { UIContext } from '../../../../../../../context/UIContext';
import useChatSocket from '../../../../../../../hooks/useChatSocket';
import { AuthContext } from '../../../../../../../context/AuthContext';
import { ChatContext } from '../../../../../../../context/ChatContext';
import { MessageContext } from '../../../../../../../context/MessageContext';
import { UpdateMessageSeenStatus } from '../../../../../../../api/Instance';
import ReplyOverlay from './components/replyOverlay';

const Input = ({inputValue,setInputValue}) => {

    const {handleSubmit,setError,watch,setValue,register,formState:{errors}} = useForm();
    const MessageInput = register("message", { required: {value:true,message:"Required field"} });
    const [isTyping,setIsTyping] = useState(false);
    const [sendMessageError,setSendMessageError] = useState(null);
    const MessageInputRef = useRef(null);
    /**
     * 1: These hook using for send message and get real time response 
    */
    const {Data,HandleSendMessage} = useSendMessage();

    const {HandleIsTypingUser,HandleStopTypingUser} = useChatSocket();

    // Get selected chat id
    const {selectedChat,setSelectChat,setChats} = useContext(ChatContext);
    const {setChatMessages,chatMessages,replyTo} = useContext(MessageContext);

    // Get user information
    const {user} = useContext(AuthContext)

    /**
     * 1: These useEffect using for Error Handling 
    */
    useEffect( () => {
        if(Data.SendMessageError !== null){
            setSendMessageError(Data.SendMessageError);
        }
    },[Data.SendMessageError])

    /**
     * 1: These usEffect using for sended message 
    */
    // useEffect( () => {
    //     console.log(Data.SendedMessage)
    // },[Data.SendedMessage])

    /**
     * 1: remove all spaces for contet
     * 2: get chatId
     * 3: send message 
    */
    const HandleSubmitMessage = async (message) => {
        try {
            const updateUIMessagePayload = {
                content:message?.message,
                chatId:selectedChat?._id,
                type:"TEXT",
                seen:"PENDING",
                sender:{
                    _id:user?._id,
                    fullname:user?.fullname,
                    avatar:user?.fullname,
                    coverImage:user?.coverImage
                },
                status: "ENABLED",
                chatId:selectedChat?._id,
                createdAt:Date.now()
            }

            let sendMessagePayload = {};
            if(replyTo !== null){
                updateUIMessagePayload.replyToMessage = replyTo;
                sendMessagePayload = {
                    content:message?.message,
                    chatId:selectedChat?._id,
                    type:"Text",
                    replyTo: replyTo?._id,
                }
            }else {
                sendMessagePayload = {
                    content:message?.message,
                    chatId:selectedChat?._id,
                    type:"Text",
                }
            }

            setChatMessages((prevMessages) => [updateUIMessagePayload,...prevMessages]);
            setChats( (prevChats) => {
                const FindSelectedChatIndex = prevChats?.findIndex( (chat) => chat?._id?.toString() == (selectedChat?._id?.toString() || updateUIMessagePayload?.chatId?.toString()));
                if(FindSelectedChatIndex === -1) return prevChats;
                const updatedChat = {
                    ...prevChats[FindSelectedChatIndex],
                    lastMessage:updateUIMessagePayload,
                    unreadedMessages: prevChats[FindSelectedChatIndex].unreadedMessages,    
                };
                const newestChatList = [
                    updatedChat,
                    ...prevChats?.filter( (c,i) => i !== FindSelectedChatIndex)
                ];
                return newestChatList;
            });
            const sendedMessage = await HandleSendMessage(sendMessagePayload);
            setInputValue("");
            setValue("message", "", { shouldDirty: true, shouldValidate: false });
            MessageInputRef.current.focus();
        } catch (error) {
            console.log(error)
            setSendMessageError(error?.message || error);
        }
    };

    // These useEffect using for focus out
    useEffect(() => {
        const HandleClick = (e) => {
          if (MessageInputRef.current && !MessageInputRef.current.contains(e.target)) {
            HandleStopTypingUser(user._id,selectedChat._id)
          }
        };
      
        document.addEventListener("click", HandleClick);
        return () => document.removeEventListener("click", HandleClick);
      }, [user?._id, selectedChat?._id]);
      

    // Check if error to show error
    // if(!sendMessageError){
    //     console.log(sendMessageError)
    // }

    /**
     * note: These Handler using Typing indicaters,
     * HandleIsTypingUser,HandleStopTypingUser
    */
    return (
        <form className='flex flex-1' onSubmit={handleSubmit(HandleSubmitMessage)}>
            <input {...MessageInput} ref={ (e) => { MessageInput.ref(e); MessageInputRef.current = e }} value={inputValue} onChange={ (e) => setInputValue(e.target.value)}  onFocus={ () => HandleIsTypingUser(user._id,selectedChat._id)} type="text" className='w-full outline-0' placeholder='Type your message' />
            <button type='submit' className={`flex h-10 w-10 group items-center ${watch("message")?.length > 0 ? 'bg-black text-white' : 'hover:bg-black'} justify-center cursor-pointer rounded-full`}><SendFilledIcon className="group-hover:text-white"/></button>
        </form>
    );
}

export default Input;
