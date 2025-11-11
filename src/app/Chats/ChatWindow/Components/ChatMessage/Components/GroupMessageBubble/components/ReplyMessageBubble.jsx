import React from 'react';

// Color Genrater
import RandomColorGenrater from '../../../../../../../../utils/RandomColorGenrater/RandomColorGenrater';
import {HdFilled, ImageRefreshedIcon, VideoCallRefreshed, VideoPiPIcon} from "../../../../../../../../assets/Icons";
const ReplyMessageBubble = ({message}) => {
    
    const color = RandomColorGenrater(message?.content);

    return (
        <div id="sub-message" className='min-h-14 rounded-lg overflow-hidden flex gap-1 items-center justify-start mb-[3px_!important]'>
            
            {/* left side */}
            <div className='w-1 h-full' style={{background:color,height:"52px"}}></div>

            {/* second side */}
            <div className='bg-[#f6f5f4] w-full h-full'>
                <div id="message-content" className='flex justify-between items-start gap-2'>
                    {/* Video Reply */}
                    {message?.type === "VIDEO" && (
                        <>
                            <div className='flex flex-col gap-1 justify-center'>
                                <div id="top-header" className='flex gap-2 items-center mt-[5px_!important]'>
                                    <h3 className={`text-13 hover:underline cursor-pointer`} style={{color:color}}><span>~</span> <span>{message?.sender.fullname}</span></h3>
                                    <span className='text-11 text-black-99'>{message?.sender?.phoneNumber}</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <span><VideoCallRefreshed className="text-black-99 w-4 h-4" /></span>
                                    {message?.content?.length > 0 && (<p className='text-12 text-black-99'>{message?.content}</p>)}
                                </div>
                            </div>
                            <div>
                                <video src={message?.media?.mediaUrl.replace("/upload","/upload/w_58,h_58,c_fill")} disablePictureInPicture></video>
                            </div>
                        </>
                    )}

                    {/* Image Reply */}
                    {message?.type === "IMAGE" && (
                        <>
                            <div className='flex flex-col gap-1 justify-center'>
                                <div id="top-header" className='flex gap-2 items-center mt-[5px_!important]'>
                                    <h3 className={`text-13 hover:underline cursor-pointer`} style={{color:color}}><span>~</span> <span>{message?.sender.fullname}</span></h3>
                                    <span className='text-11 text-black-99'>{message?.sender?.phoneNumber}</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <span><ImageRefreshedIcon className="text-black-99 w-4 h-4" /></span>
                                    {message?.content?.length > 0 && (<p className='text-12 text-black-99'>{message?.content}</p>)}
                                </div>
                            </div>
                            <div>
                                <img src={message?.media?.mediaUrl.replace("/upload","/upload/w_58,h_58,c_fill")} />
                            </div>
                        </>
                    )}
                    
                    {/* Text message Reply */}
                    {message?.type === "TEXT" && (
                        <>
                            <div className='flex flex-col gap-1 justify-center'>
                                <div id="top-header" className='flex gap-2 items-center mt-[5px_!important]'>
                                    <h3 className={`text-13 hover:underline cursor-pointer`} style={{color:color}}><span>~</span> <span>{message?.sender.fullname}</span></h3>
                                    <span className='text-11 text-black-99'>{message?.sender?.phoneNumber}</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    {message?.content?.length > 0 && (<p className='text-12 text-black-99'>{message?.content}</p>)}
                                </div>
                            </div>
                        </>
                    )}
                    
                                                                                                                                       
                </div>
            </div>
        
        </div>
    )
}

export default ReplyMessageBubble;
