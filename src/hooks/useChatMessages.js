import { useEffect,useState } from "react";

// Api Instance
import { GetUserChatMessages } from "../api/Instance";

const useChatMessages = () => {

    // States
    const [Data,SetData] = useState({
        ChatMessagesError:null,
        ChatMessagesLoading:false,
        FetchedChatMessages:null
    });

    // These useEffect using for getting all chats
    // useEffect( () => {

    // Delay fuction
    const Delay = (cb,delay) => new Promise( (resovle) => { setTimeout( () => resovle(cb()),delay)}); 

    const HandleFetchSelectedChatMessages = async (payload) => {
        try {
            // SetData({FetchedChats:null,ChatsError:null,ChatsLoading:true});
            SetData( (...prev) => ({...prev,ChatMessagesLoading:true}));
            const chatResponse = await Delay( () => GetUserChatMessages(payload),500);
            if(chatResponse.data?.statusCode === 200 && chatResponse.data?.success === true && chatResponse.data?.message === "Data fetched successfully."){
                // SetData({FetchedChats:chatsResponse?.data?.data,ChatsError:null,ChatsLoading:false});
                SetData( (...prev) => ({...prev,ChatMessagesLoading:false,FetchedChatMessages:chatResponse?.data?.data}));
                return chatResponse?.data?.data;
            }else {
                // SetData( (...prev) => ({...prev,ChatsLoading:false,FetchedChats:chatsResponse?.data?.data}));
                SetData({FetchedChatMessages:chatResponse?.data?.data,ChatMessagesError:"Error: some thing wrong",ChatMessagesLoading:false});
            }
        } catch (error) {
            // SetData({FetchedChats:null,ChatsError:error?.response?.data || error?.response || error,ChatsLoading:false});
            // console.log(error)
            SetData( (...prev) => ({...prev,ChatMessagesLoading:false,ChatMessagesError:error?.response?.data || error?.response || error}));
        }
    };

    // const chatMessagesFetchingTimer = setTimeout(HandleFetchingChatMessages,500);

    //     return () => {clearTimeout(chatMessagesFetchingTimer)};

    // },[payload.chatId])

    return {HandleFetchSelectedChatMessages,Data};
};

export default useChatMessages;