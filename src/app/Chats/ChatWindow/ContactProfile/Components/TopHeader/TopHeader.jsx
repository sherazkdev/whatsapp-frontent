import React from 'react';

// Icons
import {CloseRefreshedIcon,PencilRefreshedIcon} from "../../../../../../assets/Icons"

const TopHeader = ({HandleCloseContactProfile,chat}) => {
    return (
        <section id='top-header-fixed' className='min-w-full min-h-12'>
            <header className='flex justify-between items-center p-2.5 sticky top-0 h-[50px]'>
                <div className='flex gap-1 items-center justify-starts'>
                    <div>
                        <button onClick={HandleCloseContactProfile} className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'><CloseRefreshedIcon /></button>
                    </div>
                    <div>
                        <h2 className='text-15'>{chat?.isGroup ? "Group info" : "Contact Info"}</h2>
                    </div>
                </div>
                {chat?.isGroup !== true && (<div><button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'><PencilRefreshedIcon /></button></div>)}
            </header>
        </section>
    )
}

export default TopHeader;
