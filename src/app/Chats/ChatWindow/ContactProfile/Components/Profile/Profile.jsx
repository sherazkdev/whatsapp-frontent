import React, { useContext, useEffect, useState } from "react";

// Icons
import {PencilRefreshedIcon,MediaFolderRefreshedIcon,FavoriteRefreshedIcon,BlockRefreshedIcon,ReportRefreshedIcon,DeleteRefreshedIcon} from "../../../../../../assets/Icons";

// Components
import ImagePreviewer from "../../../../../../shared/Modal/ImagePreviewerModal/ImagePreviewerModal";
import { ChatContext } from "../../../../../../context/ChatContext";
import { MessageContext } from "../../../../../../context/MessageContext";
import GroupMembers from "./Components/GroupMembers";
import Scrollbar from "react-scrollbars-custom";
const Profile = ({chat}) => {
    
    const [clickedMedia,setClickedMedia] = useState(null);
    
    const [media,setMedia] = useState(null);
    /** Contexts */
    const {selectedChat} = useContext(ChatContext);
    const {sharedMedia,setSharedMedia} = useContext(MessageContext);
    
    const HandleClickedMediaFile = (id) => setClickedMedia(id);

    // Handle Close Image Previewer
    const HandleCloseImagePreviewer = () => setClickedMedia(null);
    
    useEffect( () => {
        const replacedUrls = sharedMedia?.slice(0,4).map((media) => {
            return {
              ...media,
              media: {
                ...media.media,
                mediaUrl: media.media.mediaUrl.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto:best,fl_lossy/"
                )
              }
            };
        });          

        setMedia(replacedUrls);

    },[sharedMedia]);

    return (
        <>
            
            <section className="w-full h-screen">
                {/* Profile Thumbnail and info */}
                <div className={`flex justify-center flex-col items-center gap-3 ${chat?.isGroup ? "pt-[410px]" : "pt-[140px]"} overflow-scroll p-3 z-10 h-full`}>
                        
                        {/* avatar */}
                        <div className="w-32 h-32">
                            <img src={selectedChat?.isGroup ? selectedChat.group?.groupAvatar : selectedChat.members[0].avatar} alt=""  className="w-full h-full rounded-full object-cover"/>
                        </div>
                        
                        {/* Fullname*/}
                        <div>
                            <h2 className="text-24">{selectedChat?.isGroup ? selectedChat.group?.name : selectedChat.members[0].fullname}</h2>
                        </div>

                        {/* Phone number or username */}
                        <div>
                            <p className="text-15 text-black-99">{selectedChat?.isGroup ? (
                                <>
                                    <div className="flex gap-3 text-black-99 text-14 font-normal relative">
                                        
                                        {/* Group Label */}
                                        <span>Group</span>
                                        
                                        {/* Dot */}
                                        <span className="font-extrabold absolute left-[42px] bottom-[2px]">.</span>

                                        {/* Members list */}
                                        <span>members {selectedChat?.members?.length}</span>
                                    
                                    </div>
                                </>
                            ) : selectedChat.members[0].phoneNumber}</p>
                        </div>

                        {/* Add not about your customer*/}
                        <div className="w-full flex justify-between items-start">
                            <div className="content-center ">
                                <p className="text-16 text-black-99 mt-[7px_!important]">Add notes about your customer.</p>
                            </div>
                            <div>
                                <button className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]"><PencilRefreshedIcon /></button>
                            </div>
                        </div>

                        {/* Add Not Input */}
                        <div className="w-full flex flex-col gap-1">
                            <h3 className="text-14 text-black-99 font-medium">About</h3>
                            <p className="text-15 text-[#0A0A0A]">{selectedChat?.isGroup ? selectedChat.group?.description : selectedChat.members[0].about}</p>
                        </div>

                        <div className="w-full">
                            <div className="bg-[#0000001a] h-[2px] w-full"></div>
                        </div>

                        {/* Media */}
                        <div className="w-full flex gap-2 flex-col">
                            
                            {/* Media Lenght */}
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-3">
                                    <button><MediaFolderRefreshedIcon /></button>
                                    <p className="text-15 font-normal">Media, links and docs</p>
                                </div>
                                <span className="text-black-99">2</span>
                            </div>

                            {/* Media sended items */}
                            <div className="flex gap-0 w-full justify-start flex-wrap">
                                {media !== null && media?.length > 0 && media.map( (media,index) => (
                                    <div key={index} className="w-[171px] h-[156px] overflow-hidden m-[5px_5px_5px_0px_!important]">
                                        {media.type === "IMAGE" && (
                                            <img className="w-full h-full object-cover rounded-lg" onClick={() => HandleClickedMediaFile(media?._id)} src={media.media.mediaUrl} alt={media?.content || media.sender.fullname} loading="lazy"/>
                                        )}
                                        {media.type === "VIDEO" && (
                                            <video className="h-full w-full object-cover rounded-lg" onClick={() => HandleClickedMediaFile(media?._id)} src={media.media.mediaUrl} alt={media?.content || media.sender.fullname} loading="lazy"/>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="bg-[#0000001a] h-[1px] w-full"></div>
                        </div>
                        
                        {/* is Group To show all members */}
                        {media?.length > 0 && (
                            <GroupMembers members={selectedChat?.members}/>
                        )}

                        <div className="w-full">
                            <div className="bg-[#0000001a] h-[1px] w-full"></div>
                        </div>

                        {/* for contact info */}
                        {chat?.isGroup !== true && (
                            <>
                                {/* block fav unblock delete chat */}
                                <div className="w-full flex flex-col justify-start items-start">

                                    {/* add to fav button */}
                                    <div className="w-full">
                                        <button className="flex gap-2 p-[15px_15px_15px_5px] cursor-pointer rounded-xl hover:bg-neutral-light5 w-full text-15 text-[#0A0A0A] font-normal">
                                            <div><FavoriteRefreshedIcon /></div>
                                            <div>
                                                <p>Add to favorite</p>
                                            </div>
                                        </button>
                                    </div>
                                    
                                    {/* block button  */}
                                    <div className="w-full">
                                        <button className="flex gap-2 p-[15px_15px_15px_5px] cursor-pointer rounded-xl hover:bg-neutral-light5 w-full  text-15 text-[#ea0038] font-normal">
                                            <div>
                                                <BlockRefreshedIcon />
                                            </div>
                                            <div>
                                                <p>Block {chat?.members[0]?.fullname}</p>
                                            </div>
                                        </button>
                                    </div>

                                    {/* report person button */}
                                    <div className="w-full">
                                        <button className="flex gap-2 p-[15px_15px_15px_5px] cursor-pointer rounded-xl hover:bg-neutral-light5 w-full text-15 text-[#ea0038] font-normal">
                                            <div>
                                                <ReportRefreshedIcon />
                                            </div>
                                            <div>
                                                <p>Report {chat?.members[0]?.fullname}</p>
                                            </div>
                                        </button>
                                    </div>

                                    {/* delete chat */}
                                    <div className="w-full mb-[50px_!important]">
                                        <button className="flex gap-2 p-[15px_15px_15px_5px] cursor-pointer rounded-xl hover:bg-neutral-light5 w-full text-15 text-[#ea0038] font-normal">
                                            <div>
                                                <DeleteRefreshedIcon />
                                            </div>
                                            <div>
                                                <p>Delete chat</p>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            </>
                        )}

                        {/* for group  */}
                        {chat?.isGroup && (
                            <>
                                {/* block fav unblock delete chat */}
                                <div className="w-full flex flex-col justify-start items-start">

                                    {/* add to fav button */}
                                    <div className="w-full">
                                        <button className="flex gap-2 p-[15px_15px_15px_5px] cursor-pointer rounded-xl hover:bg-neutral-light5 w-full text-15 text-[#0A0A0A] font-normal">
                                            <div><FavoriteRefreshedIcon /></div>
                                            <div>
                                                <p>Add to favorite</p>
                                            </div>
                                        </button>
                                    </div>
                                    
                                    {/* Exit group button  */}
                                    <div className="w-full">
                                        <button className="flex gap-2 p-[15px_15px_15px_5px] cursor-pointer rounded-xl hover:bg-neutral-light5 w-full  text-15 text-[#ea0038] font-normal">
                                            <div>
                                                <BlockRefreshedIcon />
                                            </div>
                                            <div>
                                                <p>Exit group</p>
                                            </div>
                                        </button>
                                    </div>

                                    {/* report group button */}
                                    <div className="w-full mb-[50px_!important]">
                                        <button className="flex gap-2 p-[15px_15px_15px_5px] cursor-pointer rounded-xl hover:bg-neutral-light5 w-full text-15 text-[#ea0038] font-normal">
                                            <div>
                                                <ReportRefreshedIcon />
                                            </div>
                                            <div>
                                                <p>Report report group</p>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            </>
                        )}

                </div>
            </section>

            {clickedMedia !== null && <ImagePreviewer clickedMedia={clickedMedia} HandleCloseImagePreviewer={HandleCloseImagePreviewer}/>}
        </>
    )

};

export default Profile;