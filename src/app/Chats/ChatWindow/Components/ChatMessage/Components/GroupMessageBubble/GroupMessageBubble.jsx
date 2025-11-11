import React, { useState } from 'react';

// Icons
import {TailInIcon,ChevronDownMenuIcon,TailOutIcon,MediaPlay,MsgSendIcon,HdFilled} from "../../../../../../../assets/Icons";

// Message Types Bubble
import TextMessageBubble from "./components/TextMessageBubble";
import VideoMessageBubble from './components/VideoMessageBubble';
import ImageMessageBubble from "./components/ImageMessageBubble";

const GroupMessageBubble = ({message}) => {

    return (
        <>
            {/* Text Message */}
            {message.type === "TEXT" && (
                <TextMessageBubble message={message}  />
            )}
            
            {/* Video Message */}
            {message.type === "VIDEO" && (
                <VideoMessageBubble message={message}  />
            )}
            
            {/* Image Message */}
            {message.type === "IMAGE" && (
                <ImageMessageBubble message={message}  />
            )}
            
        </>
    )
}

export default GroupMessageBubble;