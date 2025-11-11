import React, { useContext, useEffect, useState } from 'react';

// Icons
import {MoreRefreshed,SearchRefreshed} from "../../../../../assets/Icons";
import {UIContext} from "../../../../../context/UIContext";
import useChatSocket from "../../../../../hooks/useChatSocket";
import { ChatContext } from '../../../../../context/ChatContext';

const ChatHeader = ({HandleOpenContactProfile}) => {

    // States
    const [isTyping,setIsTyping] = useState(false);

    // PrivateChatHeader
    const {selectedChat} = useContext(ChatContext);

    /**
     * 1: socket services 
    */
    const {TypingIndicater} = useChatSocket();

    // These useEffect using for real time typing Indicater response
    useEffect( () => {
        setIsTyping(TypingIndicater);
    },[TypingIndicater]);
    
    return (
        <header className='flex justify-between p-[10px_16px] items-center h-full w-full opacity-[100%_important] bg-white z-10 shadow sticky top-0'>
            {/* left section */}
            <div className='flex gap-3 items-center cursor-pointer' onClick={ () => HandleOpenContactProfile(selectedChat)}>
                
                <div className='w-[40px] h-[40px] rounded-full'>
                    <img src={selectedChat?.isGroup ? selectedChat?.group?.groupAvatar : selectedChat?.members[0]?.avatar} alt={selectedChat?.isGroup ? selectedChat?.group?.name : selectedChat?.members[0]?.fullname} className='w-full h-full rounded-full object-cover' />
                </div>

                <div className='flex flex-col jutify-center gap-1'>
                    <h2 className='text-16'>{selectedChat?.isGroup ? selectedChat?.group?.name : selectedChat?.members[0]?.fullname}</h2>
                    <p className='text-12 text-black-99'>{isTyping && "Typing..."}</p>
                </div>

            </div>

            {/* right section */}
            <div className='flex gap-1'>
                <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>{<SearchRefreshed />}</button>
                <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>{<MoreRefreshed />}</button>
            </div>
        </header>   
    )
}

export default ChatHeader;
