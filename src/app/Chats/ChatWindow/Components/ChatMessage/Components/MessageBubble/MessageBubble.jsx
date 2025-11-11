import React, { useState } from 'react';

// Icons
import {TailInIcon,ChevronDownMenuIcon,TailOutIcon,MediaPlay,MsgSendIcon,HdFilled} from "../../../../../../../assets/Icons";

// Message Types Bubble
import TextMessageBubble from "./components/TextMessageBubble";
import ImageMessageBubble from "./components/ImageMessageBubble";
import VideoMessageBubble from "./components/VideoMessageBubble";
const MessageBubble = ({message}) => {
    const [bubbleHover,setBubbleHover] = useState(false);
    return (
        <>
            {message.type === "VIDEO" && (
                <VideoMessageBubble message={message}/>
            )}
            {message.type === "TEXT" && (
                <TextMessageBubble message={message} />
                
            )}
            {message.type === "IMAGE" && (
                <ImageMessageBubble message={message} />
            )}
        </>
    )
}

export default MessageBubble;