import { useState,useContext,useEffect, createContext } from "react";
import useChats from "../hooks/useChats";
import LoadingScreen from "../app/LoadingScreen/LoadingScreen";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    // States
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [chats,setChats] = useState(null);    
    const [selectedChat, setSelectChat] = useState(null);
    const [unReadChatMessages,setUnreadChatMessage] = useState({});

    // These Hook using for fetching all chats
    const {FetchedChats,ChatsError,ChatsLoading} = useChats();

    // These useEffect using for error handling
    useEffect( () => {
        if(ChatsError !== null){
            setError(ChatsError)
        }
    },[ChatsError]);

    useEffect( () => {
        console.log("Unreaded Messages",unReadChatMessages)
    },[unReadChatMessages])

    // These useEffect using for loading
    useEffect( () => {
        setLoading(ChatsLoading);
    },[ChatsLoading])

    useEffect( () => {
        if(FetchedChats !== null){
            const FilteredChatIdsAndUnreadMessages = FetchedChats?.reduce((acc, chat) => {
                acc[chat._id] = chat?.unreadedMessages?.map( (unreadMessage) => (unreadMessage?._id));
                return acc;
            }, {});
            setUnreadChatMessage(FilteredChatIdsAndUnreadMessages);
            setChats(FetchedChats);
        }
    },[FetchedChats])

    if(loading){
        return <LoadingScreen />
    }

    if(chats !== null){
        return (
            <ChatContext.Provider value={{setChats,chats,selectedChat, setSelectChat,unReadChatMessages,setUnreadChatMessage}}>
                {children}
            </ChatContext.Provider>
        )
    }

};

