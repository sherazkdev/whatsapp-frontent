import React, { useContext } from 'react';

// Icons
import {DownloadRefreshedIcon,CloseRefreshedIcon,ForwardRefreshedIcon,BackRefreshedIcon,Expressions} from "../../../../../assets/Icons";
import { AuthContext } from '../../../../../context/AuthContext';
import { ChatContext } from '../../../../../context/ChatContext';
const TopHeader = ({media,HandleCloseImagePreviewer}) => {

    /** Contexts */
    const {user} = useContext(AuthContext);
    const {selectedChat} = useContext(ChatContext);

    return (
        <header className='flex p-3.5 justify-between items-center overflow-hidden'>
            <div id="left-send-user-info" className='flex-1 flex gap-3 justify-start items-center'>
                
                {/* avatar */}
                <div className='w-[40px] h-[40px] rounded-full'>
                    <img src={media?.sender === user?._id ? user?.avatar : selectedChat?.members?.avatar}className='w-full h-full rounded-full'/>
                </div>
                
                {/* sended user name and uploadted at time */}
                <div className='flex gap-1 flex-col'>
                    
                    {/* name */}
                    <div>
                        <h2 className="text-14 text-normal text-[#0A0A0A]">{media?.sender === user?._id ? user?.fullname : selectedChat?.members?.fullname}</h2>
                    </div>
                    
                    {/* uploadted at */}
                    <div>
                        <p className='text-13 font-normal text-black-99'>{media?.createdAt}</p>
                    </div>
                </div>
            
            </div>
            <div id="left-send-user-info" className='flex gap-2 text-black-99'>
                <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'><BackRefreshedIcon /></button>
                <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'><Expressions /></button>
                <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'><ForwardRefreshedIcon /></button>
                <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'><DownloadRefreshedIcon /></button>
                <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]' onClick={HandleCloseImagePreviewer}><CloseRefreshedIcon /></button>
            </div>
        </header>
    )
}

export default TopHeader;
