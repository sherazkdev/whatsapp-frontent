import React, { useContext } from 'react';
import {StatusRefreshed,ChatFilledRefreshed,CommunityRefreshed32,NewsletterOutline,Storefront,SettingsRefreshed} from "../../assets/Icons";

// Contexts
import { UIContext } from '../../context/UIContext';
const Sidebar = () => {

    // Links
    const NavLinks = [
        {
            icon : ChatFilledRefreshed,
            ref:"chats",
            latestMessages:8,
        },
        {
            icon: StatusRefreshed,
            ref:"status",
            latestMessages:false,
        },
        {
            icon : NewsletterOutline,
            ref:"channel",
            latestMessages:false,
        },
        {
            icon: CommunityRefreshed32,
            ref:"communities",
            latestMessages:false,
        }
    ];

    // Page Context
    const {page,HandleSetPage} = useContext(UIContext);

    return (
        <aside className="p-3 w-full  grid grid-rows-[90%_1fr] bg-[#f7f5f3] border h-screen border-[#e5e5e5]" style={{padding:"10px 12px"}}>
            <div id="topLinks">
                <ul className="list-none flex flex-col space-y-3">
                    
                    {NavLinks?.map( (link,indexNumber) => (
                        <li key={indexNumber} className={`relative ${page === link.ref ? "bg-[#eae9e7]" : "hover:bg-[#eae9e7]"} rounded-full cursor-pointer max-w-[40px] flex justify-center items-center max-h-[40px]`}> 
                            <button className="p-[8px_!important]" onClick={ () => HandleSetPage(link.ref)}>
                                <link.icon color={`${page === link.ref ? "currentColor" : "#878685"}`}/>
                            </button>
                        </li>
                    ))}

                    <li className="relative rounded-full cursor-pointer max-w-[40px] flex justify-center items-center space-y-10 flex-col max-h-[40px] mt-[5px_!important]">
                        <span className="w-full bg-[#dedcda] h-[1px_!important]"></span>
                        <button className="mt-[8px_!important] "><Storefront color={`${page === "store" ? "currentColor" : "#878685"}`}/></button>
                    </li>

                </ul>
            </div>

            <div id="profile" className="flex flex-col justify-end items-center gap-2">
                <div className="p-[8px_!important] cursor-pointer hover:bg-[#eae9e7] rounded-full">
                    <button onClick={HandleSetPage}>
                        <SettingsRefreshed color={`${page === "store" ? "currentColor" : "#878685"}`}/>
                    </button>
                </div>
                <div className="p-[8px_!important] hover:bg-[#eae9e7] rounded-full">
                    <img src="https://yt3.ggpht.com/VunTf0NzCeboiPjbesBdnQuxaF3Lja7UGRbBGQAWRJgMSTj9TTLO3pS1X9qPOJGCNnmPrXeY=s88-c-k-c0x00ffffff-no-rj" className="w-[28px] h-[28px] object-cover rounded-full" alt="" />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
