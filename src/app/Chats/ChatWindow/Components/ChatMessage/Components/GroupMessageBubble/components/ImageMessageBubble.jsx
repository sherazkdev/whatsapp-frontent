import React,{useEffect,useState,useContext,useRef} from "react";

// Icons
import {TailInIcon,ChevronDownMenuIcon,MsgSendIcon,MediaPlay,HdFilled,TailOutIcon,TailIn,InfoRefreshed,ReplyRefreshed,IcMood,StarRefreshed,ForwardRefreshed,DeleteRefreshed,PinRefreshed, MsgDblcheck, MsgReadIcon, MsgDeleverdIcon, MsgWait} from "../../../../../../../../assets/Icons";
import { AuthContext } from '../../../../../../../../context/AuthContext';
import MesssageInfoModal from '../../../../../../../../shared/Modal/MessageInfoModal/MesssageInfoModal';
import ImagePreviewer from "../../../../../../../../shared/Modal/ImagePreviewerModal/ImagePreviewerModal";
import ReplyMessageBubble from "./ReplyMessageBubble";
// Color Genrater
import RandomColorGenrater from "../../../../../../../../utils/RandomColorGenrater/RandomColorGenrater";
import { MessageContext } from "../../../../../../../../context/MessageContext";

const ImageMessageBubble = ({message}) => {
    const MessageInfoRef = useRef(null);
    const [showPopup, setShowPopup] = useState(null);
    const [bubbleHover,setBubbleHover] = useState(false);
    const [clickedMedia,setClickedMedia] = useState(null);

    // Color
    const color = RandomColorGenrater(message?.content);

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
    const HandleClickedMediaFile = (id) => setClickedMedia(id);
    // Handle Close Image Previewer
    const HandleCloseImagePreviewer = () => setClickedMedia(null);
    
    const transformCloudinaryUrl = (url, width, height) => {
        return url.replace(
          "/upload/",
          `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
        );
      };
      
    const original = message.media.mediaUrl;
    const resized = transformCloudinaryUrl(original, 400, 700);



    return (
        <>
            {message?.sender?._id !== user?._id && (
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
                                    {showPopup && (
                                        <div className="absolute w-47 h-auto bg-white z-20 p-2 rounded-xl shadow-[0px_1px_0.5px_#0b141a21] bottom-5 right-0" >
                                            <MesssageInfoModal message={message} showPopup={showPopup} MessageInfoRef={MessageInfoRef}/>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Is replied message */}
                                {message?.replyToMessage !== undefined && (
                                    <>
                                        <ReplyMessageBubble message={message?.replyToMessage} />
                                    </>
                                )}
                                
                                {/* Message Content */}
                                <div id="content" className="flex justify-between gap-1 items-start relative overflow-hidden">
                                    {/* image or some crud clicks */}
                                    <div className="relative bg-white z-10 rounded-lg p-0 m-auto">
                                        <div className="w-[240px] h-auto rounded-lg relative">
                                            <img src={resized}  className="rounded-lg w-full"/>
                                            <div id="time-and-seen-status" className="absolute bottom-1 right-1 flex gap-1">
                                                <span id="time" className="text-11 text-white text-normal">12:00 AM</span>
                                                <span><MsgSendIcon className="w-4 h-3 text-white"/></span>
                                            </div>
                                        </div>
                                        {/* Message Seen Status */}
                                        <div id="message-content" className="mt-[4px_!important]">
                                            {message?.content?.length > 0 && (<p className="text-14 text-[#0A0A0A]">{message?.content}</p>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            )}
            {message?.sender?._id === user?._id && (
                <article className="flex w-full justify-end" onClick={ () => HandleClickedMediaFile(message?._id)}>
                    <div className="w-fit h-auto flex gap-2 rounded-lg rounded-tl-none relative mb-[3px_!important]" onMouseOver={() => setBubbleHover(true)} onMouseLeave={() => setBubbleHover(false)}>
                        {/* react or forward icon */}
                        <div className="flex gap-3 items-center justify-center">
                            <button className="bg-white rounded-full p-1"><ForwardRefreshed className="text-black-99" /></button>
                            <button className="bg-white rounded-full p-1"><IcMood  className="text-black-99" /></button>
                        </div>

                        {showPopup && (
                            <div className="absolute w-47 h-auto bg-white z-20 p-2 rounded-xl shadow-[0px_1px_0.5px_#0b141a21] top-6 right-2" >
                                <MessageInfoPopUp MessageInfoRef={MessageInfoRef} showPopup={showPopup} message={message}/>
                            </div>
                        )}
                        
                        <span className="absolute top-0 left-[-7px] text-red-400">
                            <button onClick={HandleClickChevronDownMenu}><TailInIcon className="text-white" /></button>
                        </span>
                        {/* image or some crud clicks */}
                        <div className="relative bg-white z-10 rounded-lg  p-1 m-auto">
                            
                            {/* Is replied message */}
                            {message?.replyToMessage !== undefined && (
                                <>
                                    <ReplyMessageBubble message={message?.replyToMessage} />
                                </>
                            )}

                            {/* message Content */}
                            <div className="w-[240px] h-auto rounded-lg relative">
                                <div id="image" className="relative">
                                    <span className={`absolute right-0 top-1 shadow-sm overflow-hidden transition-all duration-300 ${bubbleHover ? "translate-x-[-8px] opacity-100 z-15" : "translate-x-5 opacity-0"}`}>
                                        <button onClick={HandleClickChevronDownMenu}>
                                            <ChevronDownMenuIcon className="w-4 h-4 text-white" />
                                        </button>
                                    </span>
                                    <img src={resized}  className="rounded-lg w-full"/>
                                    <div id="time-and-seen-status" className="absolute bottom-1 right-1 flex gap-1">
                                        <span id="time" className="text-11 text-white text-normal">12:00 AM</span>
                                        <span><MsgSendIcon className="w-4 h-3 text-white"/></span>
                                    </div>
                                </div>
                                <div id="message-content" className="mt-[4px_!important]">
                                    <p className="text-14 text-[#0A0A0A]">{message?.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            )}
            {clickedMedia !== null && <ImagePreviewer clickedMedia={clickedMedia} HandleCloseImagePreviewer={HandleCloseImagePreviewer}/>}
        </>

        
    )
}

export default ImageMessageBubble;