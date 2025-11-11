import React,{useState,useRef,useEffect,useContext}  from "react";

// Icons
import {TailInIcon,ChevronDownMenuIcon,MsgSendIcon,TailOutIcon,TailIn,InfoRefreshed,ReplyRefreshed,IcMood,StarRefreshed,ForwardRefreshed,DeleteRefreshed,PinRefreshed, MsgDblcheck, MsgReadIcon, MsgDeleverdIcon, MsgWait} from "../../../../../../../../assets/Icons";

// Components

import MesssageInfoModal from "../../../../../../../../shared/Modal/MessageInfoModal/MesssageInfoModal";
import {AuthContext} from "../../.../../../../../../../../context/AuthContext";

const TextMessageBubble = ({message}) => {

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
                
                <div id="message" className="relative">
                    <article className="relative shadow-[0px_1px_0.5px_#0b141a21] bg-white flex gap-2 p-[2px_8px] w-fit min-w-24 max-w-96 rounded-lg rounded-tl-none group" onMouseOver={() => setBubbleHover(true)} onMouseLeave={() => setBubbleHover(false)} >
                        <span className="absolute top-0 left-[-8px] text-red-400">
                            <TailInIcon className="text-white" />
                        </span>

                        <div className="flex justify-between gap-1 items-center relative overflow-hidden">
                            <div className="text-14 text-[#0A0A0A]">{message.content}</div>
                            <div className="text-[11px] text-black-99 mt-[16px_!important]">{new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes()} AM</div>
                            {/* <div className="mt-[15px_!important]">
                                    <span>
                                        {message.seen === "SEEN" && (<MsgDeleverdIcon className="w-4 h-3 text-black-99"/>)}
                                        {message.seen === "DELIVERED" && (<MsgDblcheck className="w-4 h-3 text-blue-main"/>)}
                                        {message.seen === "SENT" && (<MsgSendIcon className="w-4 h-3 text-black-99"/>)}
                                    </span>
                            </div> */}
                            {/* Chevron Button with Slide Animation */}
                            <span
                                className={`absolute right-0 top-3.5 bg-white overflow-hidden transition-all duration-300 ${
                                bubbleHover ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                                }`}
                            >
                                <button onClick={HandleClickChevronDownMenu}>
                                    <ChevronDownMenuIcon className="w-4 h-4 text-black-99" />
                                </button>
                            </span>
                        </div>

                        {showPopup && (
                            <div className="absolute w-47 h-auto bg-white z-20 p-2 rounded-xl shadow-[0px_1px_0.5px_#0b141a21] bottom-10 right-0" >
                                <MesssageInfoModal message={message} showPopup={showPopup} MessageInfoRef={MessageInfoRef}/>
                            </div>
                        )}
                    </article>
                </div>
            )}
            {message?.sender?._id ===  user?._id &&  (
                <>
                    <div id="message" className="relative">
                        <article className="w-full h-auto z-10 flex justify-end">
                            <div className="w-fit min-w-24 max-w-96 p-[2px_8px] gap-2 bg-green-light relative rounded-lg rounded-tl-none flex justify-between items-center relative" onMouseOver={() => setBubbleHover(true)} onMouseLeave={() => setBubbleHover(false)}>
                                <span className="absolute top-0 right-[-8px]">
                                    <TailOutIcon className="text-green-light" />
                                </span>
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