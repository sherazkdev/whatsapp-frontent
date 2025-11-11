import React, { useState } from 'react';

// Icons
import {Expressions} from "../../../../../../../../assets/Icons";

// Plugins
import EmojiPicker from 'emoji-picker-react';
const Emoji = ({HandleClickOnEmoji}) => {
    // States
    const [activeEmojiPicker,setActiveEmojiPicker] = useState(false)
    return (
        <>
            <button onClick={ () => setActiveEmojiPicker(!activeEmojiPicker)} className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
                <Expressions />
            </button>
            

            {activeEmojiPicker && (
                <div className='relative'>
                    <div className='absolute w-10/12 h-10/3 bottom-[480px] shadow left-[-50px] z-20'>
                        <EmojiPicker onEmojiClick={HandleClickOnEmoji} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Emoji;
