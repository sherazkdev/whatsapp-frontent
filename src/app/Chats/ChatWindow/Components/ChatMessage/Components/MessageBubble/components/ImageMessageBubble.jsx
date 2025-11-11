import React,{useRef, useState,useEffect, useContext} from "react";

// Icons
import { ForwardRefreshed,IcMood ,ChevronDownMenuIcon,TailInIcon} from "../../../../../../../../assets/Icons";

// Components
import MesssageInfoModal from "../../../../../../../../shared/Modal/MessageInfoModal/MesssageInfoModal";
import {AuthContext} from "../../.../../../../../../../../context/AuthContext";
import ImagePreviewer from "../../../../../../../../shared/Modal/ImagePreviewerModal/ImagePreviewerModal";

const ImageMessageBubble  = ({message}) => {
    
    const [bubbleHover,setBubbleHover] = useState(false);
    const [showPopup,setShowPopup] = useState(false);
    const [clickedMedia,setClickedMedia] = useState(null);
    
    
    // Reference
    const MessageInfoRef = useRef(null);

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

    const HandleClickedMediaFile = (id) => setClickedMedia(id);
    // Handle Close Image Previewer
    const HandleCloseImagePreviewer = () => setClickedMedia(null);

    // Context
    const {user} = useContext(AuthContext);    
    const HandleClickChevronDownMenu = () => setShowPopup(!showPopup);
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
            {message?.sender?._id !==  user?._id && (
                <article className="w-full" onClick={ () => HandleClickedMediaFile(message?._id)}>
                    <div className="w-fit h-auto flex gap-2 rounded-lg rounded-tl-none relative mb-[3px_!important]" onMouseOver={() => setBubbleHover(true)} onMouseLeave={() => setBubbleHover(false)}>
                        {showPopup && (
                            <div className="absolute w-47 h-auto bg-white z-20 p-2 rounded-xl shadow-[0px_1px_0.5px_#0b141a21] top-6 left-55" >
                                <MesssageInfoModal MessageInfoRef={MessageInfoRef} showPopup={showPopup} message={message}/>
                            </div>
                        )}
                        <span className="absolute top-0 left-[-7px] text-red-400">
                            <TailInIcon className="text-white" />
                        </span>
                        {/* image or some crud clicks */}
                        <div className="relative bg-white z-10 rounded-lg  p-1 m-auto">
                            <span className={`absolute right-0 top-1 shadow-sm overflow-hidden transition-all duration-300 ${bubbleHover ? "translate-x-[-8px] opacity-100 z-15" : "translate-x-5 opacity-0"}`}>
                                <button onClick={HandleClickChevronDownMenu} >
                                    <ChevronDownMenuIcon className="w-4 h-4 text-white" />
                                </button>
                            </span>
                            <div className="w-[240px] h-auto rounded-lg relative">
                                <img src={resized}  className="rounded-lg w-full"/>
                                <div id="message-content" className="mt-[4px_!important]">
                                    <p className="text-14 text-[#0A0A0A]">{message?.content}</p>
                                </div>
                            </div>
                        </div>
                        {/* react or forward icon */}
                        <div className="flex gap-3 items-center justify-center">
                            <button className="bg-white rounded-full p-1"><ForwardRefreshed className="text-black-99"  /></button>
                            <button className="bg-white rounded-full p-1"><IcMood  className="text-black-99" /></button>
                        </div>
                    </div>
                </article>
            )}
            {message?.sender?._id ===  user?._id  && (
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
                            <span className={`absolute right-0 top-1 shadow-sm overflow-hidden transition-all duration-300 ${bubbleHover ? "translate-x-[-8px] opacity-100 z-15" : "translate-x-5 opacity-0"}`}>
                                <button onClick={HandleClickChevronDownMenu}>
                                    <ChevronDownMenuIcon className="w-4 h-4 text-white" />
                                </button>
                            </span>
                            <div className="w-[240px] h-auto rounded-lg relative">
                                <img src={resized}  className="rounded-lg w-full"/>
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
    );
};

export default ImageMessageBubble;