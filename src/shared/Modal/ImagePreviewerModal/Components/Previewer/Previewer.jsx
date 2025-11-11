import React from 'react';

import {ChevronIcon} from "../../../../../assets/Icons";
const Previewer = ({media,HandleNextButton,HandlePrevButton}) => {
    console.log(media)
    return (
        <div className='flex h-full justify-center items-center relative'>
            <button onClick={HandlePrevButton} className='rotate-180 flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8] absolute left-3.5 top-[50%]'><ChevronIcon /></button>
            <section id='image-previewer'>
                {media?.type === "VIDEO" && (
                    <video src={media?.media?.mediaUrl} className='w-full h-[809px]' controls autoPlay/>
                )}
                {media?.type === "IMAGE" && (
                    <img src={media?.media?.mediaUrl} className='w-full h-[800px] max-h-screen cursor-zoom-in' />
                )}
            </section>
            <button onClick={HandleNextButton} className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8] absolute right-3.5 top-[50%]'><ChevronIcon /></button>
        </div>
    );
}

export default Previewer;
