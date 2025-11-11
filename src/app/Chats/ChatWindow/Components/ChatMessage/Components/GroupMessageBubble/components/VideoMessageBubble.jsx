import React,{useState,useRef,useEffect,useContext} from 'react';

import {TailInIcon,ChevronDownMenuIcon,MsgSendIcon,MediaPlay,HdFilled,VideoPiPIcon,TailOutIcon,TailIn,InfoRefreshed,ReplyRefreshed,IcMood,StarRefreshed,ForwardRefreshed,DeleteRefreshed,PinRefreshed, MsgDblcheck, MsgReadIcon, MsgDeleverdIcon, MsgWait} from "../../../../../../../../assets/Icons";
import { AuthContext } from '../../../../../../../../context/AuthContext';
import MesssageInfoModal from '../../../../../../../../shared/Modal/MessageInfoModal/MesssageInfoModal';
import ReplyMessageBubble from './ReplyMessageBubble';
import ImagePreviewer from "../../../../../../../../shared/Modal/ImagePreviewerModal/ImagePreviewerModal";

// Random color genrater
import RandomColorGenrater from '../../../../../../../../utils/RandomColorGenrater/RandomColorGenrater';
const VideoMessageBubble = ({message}) => {

    const color = RandomColorGenrater(message?.content);

    const MessageInfoRef = useRef(null);
    const videoRef = useRef(null)
    const [showPopup, setShowPopup] = useState(null);
    const [bubbleHover,setBubbleHover] = useState(false);
    const [clickedMedia,setClickedMedia] = useState(null);

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

    const enablePiP = async () => {
        if (videoRef.current) {
          try {
            // Picture-in-Picture request
            await videoRef.current.requestPictureInPicture();
          } catch (err) {
            console.error("PiP error:", err);
          }
        }
    };
    
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
                
                                <div id="content" className="flex justify-between gap-1 items-start relative overflow-hidden">
                                    
                                    <div id="video-section" className="w-[240px] rounded-lg">
                                        {message?.replyToMessage !== undefined && (
                                            <>
                                                <ReplyMessageBubble message={message?.replyToMessage} />
                                            </>
                                        )}
                                        <div id='video-section' className='relative w-full'>

                                            <video ref={videoRef} className="w-full rounded-lg " src={message.media.mediaUrl}></video>
                                            
                                            <div id="play-button">
                                                <button onClick={ () => HandleClickedMediaFile(message?._id)} className="absolute top-[50%] left-[45%] bg-black-99 p-2 cursor-pointer rounded-full"><MediaPlay /></button>
                                            </div>
                                            
                                            <div className="absolute left-0 bottom-1 p-[0px_5px_!important] flex justify-between items-end w-full">
                                                <span className="flex items-center gap-1">
                                                    <HdFilled className="text-white"/>
                                                    <span id="duration" className="text-white text-11 font-normal">
                                                        0:55
                                                    </span>
                                                </span>
                                                <span className="text-11 text-white text-normal">
                                                    7:00 PM
                                                </span>
                                            </div>
                                        </div>    
                                        
                                        <p>{message?.content}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            )}
            {message?.sender?._id === user?._id && (
                <article className="w-full flex justify-end" onClick={ () => HandleClickedMediaFile(message?._id)}>
                        <div id="message" className="w-fit h-auto flex gap-2 rounded-lg rounded-tl-none relative" onMouseOver={() => setBubbleHover(true)} onMouseLeave={() => setBubbleHover(false)}>
                            {showPopup && (
                                <div className="absolute w-47 h-auto bg-white z-20 p-2 rounded-xl shadow-[0px_1px_0.5px_#0b141a21] top-6 right-2" >
                                    <MesssageInfoModal MessageInfoRef={MessageInfoRef} showPopup={showPopup} message={message}/>
                                </div>
                            )}

                            {/* react or forward icon */}
                            <div className="flex gap-3 items-center justify-center">
                                <button className="bg-white rounded-full p-1"><ForwardRefreshed className="text-black-99"  /></button>
                                <button className="bg-white rounded-full p-1"><IcMood  className="text-black-99" /></button>
                            </div>

                            <span className="absolute top-0 left-[-7px] text-red-400">
                                <TailInIcon className="text-white" />
                            </span>
                            
                            <div className="w-full h-auto bg-white p-1 flex gap-1 max-w-[250px] rounded-lg relative rounded-tl-none flex-col justify-center"  id={`${message?._id}`}>
                                {message?.replyToMessage !== undefined && (
                                    <>
                                        <ReplyMessageBubble message={message?.replyToMessage} />
                                    </>
                                )}
                                <div id="video-section" className="w-[240px] rounded-lg relative">
                                    <div id="top-header" className="absolute w-full p-[0px_5px_!important] flex justify-between items-start z-22 p-1">
                                        {bubbleHover && (
                                            <span>
                                                <button onClick={enablePiP}><VideoPiPIcon className="w-4 h-4 text-white"/></button>
                                            </span>
                                        )}
                                        <span className={`absolute right-0 top-0 shadow-sm overflow-hidden transition-all duration-300 ${bubbleHover ? "translate-x-[-5px] opacity-100 z-15" : "translate-x-5 opacity-0"}`}>
                                            <button onClick={HandleClickChevronDownMenu}>
                                                <ChevronDownMenuIcon className="w-4 h-4 text-white" />
                                            </button>
                                        </span>
                                    </div>
                                    <video ref={videoRef} className="w-full rounded-lg " src={message.media.mediaUrl}></video>
                                    
                                    <div id="play-button">
                                        <button className="absolute top-[50%] left-[45%] bg-black-99 p-2 cursor-pointer rounded-full" onClick={ () => HandleClickedMediaFile(message?._id)}><MediaPlay /></button>
                                    </div>
                                    
                                    <div className="absolute left-0 bottom-1 p-[0px_5px_!important] flex justify-between items-end w-full">
                                        <span className="flex items-center gap-1">
                                            <HdFilled className="text-white"/>
                                            <span id="duration" className="text-white text-11 font-normal">
                                                0:55
                                            </span>
                                        </span>
                                        <span className="flex gap-1 items-center" >
                                            <span className="text-11 text-white text-normal">7:00 PM</span>
                                            <span><MsgSendIcon className="w-4 h-3 text-white"/></span>
                                        </span>
                                    </div>
                                </div>
                                {message?.content?.length > 0 && (
                                    <div id="message-content" className="mt-[4px_!important]">
                                        <p className="text-14 text-[#0A0A0A]">Hi, Guys Guess the programing language {message.id}</p>
                                    </div>
                                )}
                            </div>

                        </div>
                </article>
            )}
            
            {clickedMedia !== null && <ImagePreviewer clickedMedia={clickedMedia} HandleCloseImagePreviewer={HandleCloseImagePreviewer}/>}
        </>
    )
}

export default VideoMessageBubble;
