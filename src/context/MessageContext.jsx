import React,{useState,useEffect,createContext,useContext} from "react";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";
import { UIContext } from "./UIContext";
import { SocketContext } from "./SocketContext";
import useChatMessages from "../hooks/useChatMessages";
import useUpdateMessagesSeenStatus from "../hooks/useUpdateMessagesSeenStatus";

/** Message Context */
export const MessageContext = createContext();

/** note: Message provider */
export const MessageProvider = ({children}) => {
    /** States Variables */
    const [chatMessages,setChatMessages] = useState(null);
    const [chatMessageFetchingLoading,setChatMessageFetchingLoading] = useState(false);
    const [error,setError] = useState(null);
    const [replyTo,setReplyTo] = useState(null);
    const [page,setPage] = useState(1);
    const [sharedMedia,setSharedMedia] = useState([]);
    
    /** Contexts for using get selected chats */
    const {user} = useContext(AuthContext);
    const {selectedChat,unReadChatMessages} = useContext(ChatContext);
    const {socket} = useContext(SocketContext);

    /** Fetching chat messages hook */
    const {HandleFetchSelectedChatMessages,Data} = useChatMessages();
    const {HandleUpdateMessagesSeenStatus,UpdateMessageDetails} = useUpdateMessagesSeenStatus();

    /** useEffect using for get selectecd chat messages and unread messages */
    useEffect( () => {
        /** if selected is if is not === null if true to dont fetch messages */
        if(selectedChat !== null){
            ( async () => {
                try {
                    
                    /** First of all add unReadChatMessages from selected chat */
                    const FetchingMessagePayload = {
                        chatId:selectedChat?._id,
                        page:page,
                        limit:100,
                    };
                    const FetchedChatMessages = await HandleFetchSelectedChatMessages(FetchingMessagePayload);
                } catch (error) {
                    setError(error);
                }
            })()
        }
    },[selectedChat,page]);


    /** Error Handling useEffect */
    useEffect( () => {
        if(Data.ChatMessagesError !== null){
            setError(Data.ChatMessagesError);
        }else if(UpdateMessageDetails.UpdateMessagesError !== null){
            setError(UpdateMessageDetails.UpdateMessagesError);
        }
    },[Data.ChatMessagesError,UpdateMessageDetails.UpdateMessagesError]);
    /** Fetching messages Loading animation state variable */
    useEffect( () => {
        setChatMessageFetchingLoading(Data.ChatMessagesLoading);
    },[Data.ChatMessagesLoading]);
    /** Fetched Data assing to chatMessages */
    useEffect( () => {
        if(!Data.ChatMessagesLoading && Data.FetchedChatMessages !== null){
            setChatMessages((prevMessages) => [
                ...prevMessages,
                ...Data.FetchedChatMessages,
            ]);
        }else {
            setChatMessages([]);
        }
    },[Data.FetchedChatMessages]);
    /* Get user shared media videos and images **/
    useEffect( () => {
        const filterSendedMedia = chatMessages?.filter( (message) => {
            if(message?.type === "VIDEO" || message?.type === "IMAGE"){
                return message;
            }
        });
        setSharedMedia(filterSendedMedia);
    },[chatMessages])
    
    /** Return childrens and methods and states */
    return (
        <MessageContext.Provider value={{chatMessages,setChatMessages,chatMessageFetchingLoading,page,setPage,sharedMedia,setSharedMedia,replyTo,setReplyTo}}>
            {children}
        </MessageContext.Provider>
    )
};
