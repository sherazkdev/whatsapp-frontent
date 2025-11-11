import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

// Components
import MessageBubble from './Components/MessageBubble/MessageBubble';
import GroupMessageBubble from "./Components/GroupMessageBubble/GroupMessageBubble";
import useChatMessages from '../../../../../hooks/useChatMessages';
import { UIContext } from '../../../../../context/UIContext';
import Loader from '../../../../../shared/Loader/Loader';

// Sounds
import NewMessageAudio from "../../../../../../public/videos/incoming-message-online-whatsapp.mp3";

// Sockets
import useChatSocket from "../../../../../hooks/useChatSocket";
import { ChatContext } from '../../../../../context/ChatContext';
import { MessageContext } from '../../../../../context/MessageContext';

const ChatMessage = () => {

    /** States */
    const [updatedMessages,setUpdateMessages] = useState({});
    /** Container reference */
    const containerRef = useRef(null);

    // Context for get selected chat
    const {selectedChat} = useContext(ChatContext);
    const {chatMessages,setChatMessages,chatMessageFetchingLoading,setPage,page} = useContext(MessageContext);
    
    // Sounds
    const audio = new Audio(NewMessageAudio);

    /**
     * 1: These hook using for real time message response 
    */
    const {NewMessage} = useChatSocket();
    useEffect(() => {
        console.log(NewMessage)
        if (NewMessage !== null) {
            setChatMessages((prev) => {
                const existingIndex = prev.findIndex(
                  (msg) =>
                    msg.seen === "PENDING" &&
                    msg.content === NewMessage.content &&
                    msg.sender._id?.toString() === NewMessage.sender?._id?.toString()
                );
                console.log(existingIndex)
                if (existingIndex === -1) {
                    const updated = [NewMessage,...prev];
                    return updated;
                }
                const updated = [...prev];
                updated[existingIndex] = { ...NewMessage };
                return updated;
            });
        }
    }, [NewMessage]);

    useEffect( () => {
        const HandleSetOrderedMessages = (messages) => {
            try {
              const msgs = messages?.map( (msg) => ({...msg,createdAt:msg.createdAt instanceof Date ? msg.createdAt : new Date(msg.createdAt)}));
              
              const startOverDay = (d) => {
                const x = new Date(d);
                x.setHours(0,0,0,0);
                return x;
              }
      
              const MS_DAY = 24 * 60 * 60 * 1000;
              let NewMessages = {
                today:[],
                yesterday:[],
                wednesday:[],
                tuesday:[],
                monday:[],
                Sunday:[],
                saturday:[],
                week:[],
                month:[]
              };
              
              for( const msg of msgs){
                const messageDay = startOverDay(msg.createdAt);
                const today = startOverDay(new Date());
                const daydeff = Math.round( (today - messageDay) / MS_DAY);
                if(daydeff === 0){
                  NewMessages.today.push(msg)
                }else if(daydeff === 1){
                  NewMessages.yesterday.push(msg)
                }else if(daydeff === 7){
                  NewMessages.week.push(msg);
                }else if(daydeff === 2){
                    NewMessages.wednesday.push(msg);
                }else if(daydeff === 3){
                    NewMessages.tuesday.push(msg);
                }else if(daydeff === 4){
                    NewMessages.monday.push(msg);
                }else if(daydeff === 5){
                    NewMessages.Sunday.push(msg);
                }else if(daydeff > 7){
                    NewMessages.month.push(msg);
                }else if(daydeff === 6){
                    NewMessages.saturday.push(msg);
                }
                
              }
              return NewMessages;
            } catch (error) {
              return console.log(error);
            }
        };
        const NewChatMessagesList = HandleSetOrderedMessages(chatMessages);
        setUpdateMessages(NewChatMessagesList);
        console.log(chatMessages[0],chatMessages[1],)
    },[chatMessages]);

    
    return (
        <section id='chat-messages'  ref={containerRef}  className='p-[20px_63px] flex flex-col-reverse gap-1 overflow-x-hidden w-full h-auto overflow-y-scroll relative scrollbar-thin'>
            {chatMessageFetchingLoading === true && (<Loader isLoading={true} />)}
            {chatMessageFetchingLoading === false && chatMessages !== null && (
                <>
                    {/* {chatMessages?.map( (message,index) => (
                        <MessageBubble message={message} key={message?._id || index} />
                    ))} */}
                    {selectedChat?.isGroup === true ? (
                        <>
                            <p>isGroup</p>
                            {Object.keys(updatedMessages).length > 0 && (
                                <>  
                                    {/* Today messages */}
                                    {updatedMessages.today?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.today.map( (msg,_y) => (
                                                <GroupMessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Today</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Yesterday messages */}
                                    {updatedMessages.yesterday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.yesterday.map( (msg,_y) => (
                                                <GroupMessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Yesterday</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Tuesday messages */}
                                    {updatedMessages.wednesday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.wednesday.map( (msg,_y) => (
                                                <GroupMessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Wednesday</p>
                                            </div>
                                        </>
                                    )}

                                    {/* Monday messages */}
                                    {updatedMessages.tuesday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.tuesday.map( (msg,_y) => (
                                                <GroupMessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Tuesday</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Sunday messages */}
                                    {updatedMessages.monday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.monday.map( (msg,_y) => (
                                                <GroupMessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Monday</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Saturday messages */}
                                    {updatedMessages.saturday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.saturday.map( (msg,_y) => (
                                                <GroupMessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Saturday</p>
                                            </div>
                                        </>
                                    )}
                                    {/* Week ago messages */}
                                    {updatedMessages.week?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.week.map( (msg,_y) => (
                                                <GroupMessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Week</p>
                                            </div>
                                        </>
                                    )}
                                    
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {Object.keys(updatedMessages).length > 0 && (
                                <>  
                                    {/* Today messages */}
                                    {updatedMessages.today?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.today.map( (msg,_y) => (
                                                <MessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Today</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Yesterday messages */}
                                    {updatedMessages.yesterday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.yesterday.map( (msg,_y) => (
                                                <MessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Yesterday</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Tuesday messages */}
                                    {updatedMessages.wednesday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.wednesday.map( (msg,_y) => (
                                                <MessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Wednesday</p>
                                            </div>
                                        </>
                                    )}

                                    {/* Monday messages */}
                                    {updatedMessages.tuesday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.tuesday.map( (msg,_y) => (
                                                <MessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Tuesday</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Sunday messages */}
                                    {updatedMessages.monday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.monday.map( (msg,_y) => (
                                                <MessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Monday</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Saturday messages */}
                                    {updatedMessages.saturday?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.saturday.map( (msg,_y) => (
                                                <MessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Saturday</p>
                                            </div>
                                        </>
                                    )}
                                    {/* Week ago messages */}
                                    {updatedMessages.week?.length > 0 && (
                                        <>
                                            
                                            {updatedMessages.week.map( (msg,_y) => (
                                                <MessageBubble message={msg} key={msg?._id || _y} />
                                            ))}
                                            <div id='day' className='w-full h-auto flex justify-center items-center'>
                                                <p className='text-12 font-semibold text-black-99 shadow-[0px_0.5px_0.5px_#0b141a21] bg-white p-[3px_20px] rounded-sm'>Week</p>
                                            </div>
                                        </>
                                    )}
                                    
                                </>
                            )}
                        </>
                    )}

                </>
            )}
        </section>
    );
}

export default ChatMessage;
