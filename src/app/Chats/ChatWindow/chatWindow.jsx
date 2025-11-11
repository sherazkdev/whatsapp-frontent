import React, { useContext,useEffect,useState } from 'react';

// Components
import IsEmtyChatWindow from './Components/IsEmtyChatWindow/IsEmtyChatWindow';
import ChatHeader from './Components/ChatHeader/ChatHeader';
import ChatFooter from "./Components/ChatFooter/ChatFooter";
import ChatMessage from "./Components/ChatMessage/ChatMessage";
import ImagePreviewer from '../../../shared/Modal/ImageEditor/ImageEditor';
import ContactProfile from "./ContactProfile/ContactProfile";
import { UIContext } from '../../../context/UIContext';
import { SocketContext } from '../../../context/SocketContext';
import { ChatContext } from '../../../context/ChatContext';

const ChatWindow = () => {
    const [clickedProfile, setClickedProfile] = useState(null);
    
    const {uploadFile,setUploadFile} = useContext(UIContext);
    const {selectedChat} = useContext(ChatContext);

    // Close Contact Profile
    const HandleOpenContactProfile = (chat) => setClickedProfile(chat);
    const HandleCloseContactProfile = () => setClickedProfile(null);
    const {socket} = useContext(SocketContext);

    // These useEffect using for un join chat 
    useEffect( () => {
        
        return () => setTimeout( () => socket.emit("close-chat",{chatId:selectedChat?._id}),100)
    },[socket,selectedChat?._id])
    
    const HandleCloseUploadModal = () => setUploadFile(null);
    return (
        <>
            {selectedChat === null ? (
                <IsEmtyChatWindow />
            ) : selectedChat !== null ? (
                <section
                    className={`grid transition-[grid-template-columns] duration-300 ease-in-out overflow-hidden ${
                    clickedProfile ? "grid-cols-[1fr_566px]" : "grid-cols-[1fr_0px]"
                }`}
                >
                    {/* Chat Area */}
                    <section className="grid w-full h-screen grid-rows-[64px_1fr_auto] relative">
                        <div className="chatBackgroundImage"></div>
                            <ChatHeader
                                HandleOpenContactProfile={HandleOpenContactProfile}
                            />
                            {uploadFile !==  null ? (
                                <div className='relative w-full h-screen'>
                                    <ImagePreviewer HandleCloseUploadModal={HandleCloseUploadModal} />
                                </div>
                            ) : (
                                <>
                                    <ChatMessage />
                                    <ChatFooter />
                                </>
                            )}
                    </section>

                    {/* Profile Panel with smooth slide */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${clickedProfile !== null ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full" }`}>
                        <ContactProfile
                            HandleCloseContactProfile={HandleCloseContactProfile}
                            chat={clickedProfile}
                        />
                    </div>
                </section>
            ) : ""}
        </>
    )
}

export default ChatWindow;
