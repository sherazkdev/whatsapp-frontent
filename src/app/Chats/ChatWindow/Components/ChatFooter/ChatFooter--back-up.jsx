import React, { useContext, useState } from 'react';

// Components
import UploadButton from "./Components/Buttons/Upload/Upload";
import EmojiButton from "./Components/Buttons/Emoji/Emoji";
import VoiceButton from "./Components/Buttons/Voice/Voice";
import InputBar from "./Components/InputBar/Input";
import { ChatContext } from '../../../../../context/ChatContext';
import { MessageContext } from '../../../../../context/MessageContext';
import ReplyOverlay from './Components/InputBar/components/replyOverlay';
const ChatFooter = () => {

    const [inputValue,setInputValue] = useState("");

    const {chatMessages,sharedMedia} = useContext(MessageContext);
    const HandleClickOnEmoji = (emoji) => setInputValue( (prevValue) => (prevValue + emoji?.emoji));
    return (
        <div className='p-[100px_16px] relative flex justify-center items-center w-full h-full'>
            <div className='p-[100px_!important] max-w-[90%]'>
                <div className='p-[8px] flex flex-col gap-0 bg-white w-full h-auto z-10 absolute bottom-[150px] left-0 right-0 rounded-md shadow-md'>
                    <section id="replies-section" className='w-full h-fit'>
                        <div id="replied-message" className='w-full'>
                            {chatMessages?.length > 0 && (<ReplyOverlay message={sharedMedia[5]} />)}
                        </div>
                    </section>

                    <section id="message-input" className='flex w-full h-fit justify-start items-center'>
                        <UploadButton />
                        <EmojiButton HandleClickOnEmoji={HandleClickOnEmoji}/>
                        <InputBar inputValue={inputValue} setInputValue={setInputValue}/>
                    </section>
                </div>
            </div>
        </div>

    );
}

export default ChatFooter;
