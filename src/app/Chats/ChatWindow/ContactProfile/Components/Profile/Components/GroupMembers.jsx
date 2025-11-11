import React, { useState,useContext } from "react";

// icons
import {PersonAddIcon,LinkRefreshedIcon, SearchRefreshed} from "../../../../../../../assets/Icons";
import { AuthContext } from "../../../../../../../context/AuthContext";
import { ChatContext } from "../../../../../../../context/ChatContext";

const GroupMembers = ({members}) => {

    const [clickedMember,setClickedMember] = useState(null);

    // Authenticated user
    const {user} = useContext(AuthContext);

    // selected chat
    const {selectedChat} = useContext(ChatContext);
    
    return (
        <>
            <section id="members-list-section" className="w-full">
                
                {/* Top Header */}
                <header id="top-header" className="flex flex-col gap-2 w-full">

                    <section id="searh-member-section" className="flex justify-between items-center w-full">
                        
                        {/* member length */}
                        <p className="text-15 text-black-99 font-normal">{members?.length} members</p>
                        
                        {/* search member button */}
                        <button><SearchRefreshed className="text-black"/></button>

                    </section>

                    <section id="add-member-or-invite-member-section" className="flex flex-col gap-2">
                        {/* Add member button */}
                        <button className="flex gap-5 items-center w-full hover:bg-[#f7f5f3] p-2 cursor-pointer">

                            {/* Icon */}
                            <span className="p-[8px] rounded-full bg-black"><PersonAddIcon className="text-white"/></span>

                            {/* Label */}
                            <span className="text-15 text-black font-normal">
                                Add member
                            </span>
                        
                        </button>
                        
                        {/* Invit group button */}
                        <button className="flex gap-5 items-center w-full p-2 rounded-md hover:bg-[#f7f5f3] cursor-pointer">

                            {/* Icon */}
                            <span className="p-[8px] rounded-full bg-black"><LinkRefreshedIcon className="text-white" /></span>

                            {/* Label */}
                            <span className="text-15 text-black font-normal">
                                Invite to group to via link
                            </span>
                        
                        </button>
                    </section>

                </header>
                {/* End Top header */}
                <main id="members-list" className="flex flex-col gap-2 w-full">
                    
                    {/* logged in user */}
                    <article className="flex gap-2 items-start p-2 rounded-md hover:bg-[#f7f5f3] cursor-pointer">

                        {/* member avatar */}
                        <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] border border-[#e5e5e5] rounded-full">
                            {!user.avatar ? (
                            <div className="w-full h-full object-center rounded-full bg-neutral-light5 relative">
                                <DefaultContact className="w-12 h-12" />
                            </div>
                            ) : (
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src={user.avatar}
                                alt={user.fullname || "You"}
                            />
                            )}
                        </div>

                        {/* member info */}
                        <div className="flex flex-col gap-0 w-full">
                            
                            {/* top name section */}
                            <div className="flex justify-between w-full">

                                {/* User name */}
                                <div>
                                    <h3 className="text-15 font-normal">You</h3>
                                </div>
                                
                                {selectedChat?.group?.admins?.includes(user?._id?.toString()) && (
                                    <div>
                                        <button className="border border-[#f1eeeb] bg-[#f0eeeb] text-[#262524] text-11 rounded-full p-[2px_5px]">Group admin</button>
                                    </div>
                                )}
                            
                            </div>

                            {/* about and member status */}
                            <div>
                                <p className="text-14 text-black-99 w-full overflow-hidden">{user.about}</p>
                            </div>

                        </div>

                    </article>                    
                    
                    {/* member */}
                    {members?.map( (member,_y) => (
                        <article className="flex gap-2 items-start p-2 rounded-md hover:bg-[#f7f5f3] cursor-pointer">

                            {/* member avatar */}
                            <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] border border-[#e5e5e5] rounded-full">
                                {!member.avatar ? (
                                <div className="w-full h-full object-center rounded-full bg-neutral-light5 relative">
                                    <DefaultContact className="w-12 h-12" />
                                </div>
                                ) : (
                                <img
                                    className="w-full h-full object-cover rounded-full"
                                    src={member.avatar}
                                    alt={member.fullname || "Unknown user"}
                                />
                                )}
                            </div>

                            {/* member info */}
                            <div className="flex flex-col gap-0 w-full">
                                
                                {/* top name section */}
                                <div className="flex justify-between w-full">

                                    {/* User name */}
                                    <div>
                                        <h3 className="text-15 font-normal">{member.fullname}</h3>
                                    </div>
                                    
                                    {selectedChat?.group?.admins?.includes(member?._id?.toString()) && (
                                        <div>
                                            <button className="border border-[#f1eeeb] bg-[#f0eeeb] text-[#262524] text-11 rounded-full p-[2px_5px]">Group admin</button>
                                        </div>
                                    )}
                                
                                </div>

                                {/* about and member status */}
                                <div>
                                    <p className="text-14 text-black-99 w-full overflow-hidden">{member.about}</p>
                                </div>

                            </div>
                            
                        </article>
                    ))}
                
                </main>

            </section>
        </>
    )

};

export default GroupMembers;