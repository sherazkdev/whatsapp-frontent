import React, { useContext, useRef, useState,useEffect } from 'react';

// Icons
import {TailInIcon,ChevronDownMenuIcon,MsgSendIcon,TailOutIcon,TailIn,InfoRefreshed,ReplyRefreshed,IcMood,StarRefreshed,ForwardRefreshed,DeleteRefreshed,PinRefreshed, MsgDblcheck, MsgReadIcon, MsgDeleverdIcon, MsgWait} from "../../../../../../../../assets/Icons";
import { AuthContext } from '../../../../../../../../context/AuthContext';
import MesssageInfoModal from '../../../../../../../../shared/Modal/MessageInfoModal/MesssageInfoModal';
import ReplyMessageBubble from "./ReplyMessageBubble";
const TextMessageBubble = ({message}) => {

    const PALETTE = [
        "#1abc9c","#16a085","#2ecc71","#27ae60","#3498db",
        "#2980b9","#9b59b6","#8e44ad","#e67e22","#d35400",
        "#e74c3c","#c0392b","#f1c40f","#f39c12","#7f8c8d",
        "#95a5a6","#34495e","#2c3e50","#ff6b6b","#ffd166"
    ];
      
    function stringToColorIndex(str, paletteLength = PALETTE.length) {
        if (!str) return 0;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
        }
        return hash % paletteLength;
    }
    const color = PALETTE[stringToColorIndex(message?.content)];

    const MessageInfoRef = useRef(null);
    const [showPopup, setShowPopup] = useState(null);
    const [bubbleHover,setBubbleHover] = useState(false);

    useEffect(() => {
        const listener = (event) => {
          if (MessageInfoRef.current && !MessageInfoRef.current.contains(event.target)) {
            setShowPopup(false);
          }
        };
      
        document.addEventListener("mousedown", listener);
      
        return () => {
          document.removeEventListener("mousedown", listener);
        };
    }, []);
    
    const {user} = useContext(AuthContext);    
    
    const HandleClickChevronDownMenu = () => setShowPopup(!showPopup);

    return (
        <>
            {message?.sender?._id !==  user?._id && (
                
                <div id="message" className="relative mb-[5px_!important]">
                    <article className='flex gap-3 items-start'>
                        {/* First section */}
                        <div>
                            <div id="user-avatar" className={`w-7 h-7 text-14 rounded-full text-center content-center text-white font-semibold`} style={{backgroundColor:color}}>
                                <span>S</span>
                            </div>
                        </div>
                        {/* second section */}
                        <div className="relative shadow-[0px_1px_0.5px_#0b141a21] bg-white flex gap-2 p-[2px_8px] w-fit min-w-24 max-w-8/13 rounded-lg rounded-tl-none group" onMouseOver={() => setBubbleHover(true)} onMouseLeave={() => setBubbleHover(false)} >
                            <span className="absolute top-0 left-[-8px] text-red-400">
                                <TailInIcon className="text-white" />
                            </span>
                            
                            <div className='flex flex-col gap-1'>
                                {/* Sender name */}
                                <div className='relative w-full'> 
                                    <h3 className={`text-13 hover:underline cursor-pointer`} style={{color:color}}><span>~</span> <span>{message?.sender?.fullname}</span></h3>
                                    {/* Chevron Button with Slide Animation */}
                                    <span
                                        className={`absolute right-0 top-0 bg-white overflow-hidden transition-all duration-300 ${
                                        bubbleHover ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                                        }`}
                                    >
                                        <button onClick={HandleClickChevronDownMenu}>
                                            <ChevronDownMenuIcon className="w-4 h-4 text-black-99" />
                                        </button>
                                    </span>
                                </div>
                                
                                {message?.replyToMessage !== undefined && (
                                    <>
                                        <ReplyMessageBubble message={message?.replyToMessage} />
                                    </>
                                )}

                                <div id="content" className="flex justify-between gap-1 items-start relative overflow-hidden">
                                    {/* Message */}
                                    <div className="text-14 text-[#0A0A0A]">{message.content}</div>
                                    {/* Upload at */}
                                    <div className="text-[11px] text-black-99 w-fit mt-[16px_!important]">{new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes()} AM</div>
                                </div>
                            </div>
                
                            {showPopup && (
                                <div className="absolute w-47 h-auto bg-white z-20 p-2 rounded-xl shadow-[0px_1px_0.5px_#0b141a21] bottom-10 right-0" >
                                    <MesssageInfoModal message={message} showPopup={showPopup} MessageInfoRef={MessageInfoRef}/>
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            )}
            {message?.sender?._id.toString() ===  user?._id.toString() &&  (
                <>
                    <div id="message" className="relative">
                        <article className="w-full h-auto z-10 flex justify-end">

                            {/* Message Content area */}
                            <div className="w-fit min-w-24 max-w-8/13 p-[2px_8px] gap-2 bg-green-light rounded-lg rounded-tl-none flex flex-col relative" onMouseOver={() => setBubbleHover(true)} onMouseLeave={() => setBubbleHover(false)}>
                                {message?.replyToMessage !== undefined && (
                                    <>
                                        <ReplyMessageBubble message={message?.replyToMessage} />
                                    </>
                                )}

                                <span className="absolute top-0 right-[-8px]">
                                    <TailOutIcon className="text-green-light" />
                                </span>

                                <div id='message-content' className='w-full h-full flex justify-between items-center'>
                                    {/* message */}
                                    <div>
                                        <p className="text-14 text-[#0A0A0A]">{message.content}</p>
                                    </div>
                                    
                                    {/* message seent status etc. */}
                                    <div className="flex gap-1 items-center relative overflow-hidden">
                                        {/* uploaded date */}
                                        <div>
                                            <p className="text-[11px] text-black-99 mt-[16px_!important]">{new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes()} PM</p>
                                        </div>

                                        {/* seen status */}
                                        <div className="mt-[15px_!important]">
                                            <span>
                                                {message.seen === "PENDING" && (<MsgWait className="text-black-99" />)}
                                                {message.seen === "SEEN" && (<MsgDeleverdIcon className="w-4 h-3 text-blue-main"/>)}
                                                {message.seen === "DELIVERED" && (<MsgDblcheck className="w-4 h-3 text-black-99"/>)}
                                                {message.seen === "SENT" && (<MsgSendIcon className="w-4 h-3 text-black-99"/>)}
                                                
                                            </span>
                                        </div>
                                        
                                        <span className={`absolute right-0 top-3.5 bg-green-light overflow-hidden transition-all duration-300 ${bubbleHover ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"}`} >
                                            <button onClick={HandleClickChevronDownMenu}>
                                                <ChevronDownMenuIcon className="w-4 h-4 text-black-99" />
                                            </button>
                                        </span>

                                    </div>

                                </div>
                                
                                {showPopup && (
                                    <div className="absolute w-47 h-auto bg-white z-20 p-2 rounded-xl shadow-[0px_1px_0.5px_#0b141a21] bottom-10 right-0" >
                                        <MesssageInfoModal message={message} showPopup={showPopup} MessageInfoRef={MessageInfoRef}/>
                                    </div>
                                )}
                            </div>
                        
                        </article>
                    </div>
                </>
            )}
        </>
    )
}

export default TextMessageBubble;
