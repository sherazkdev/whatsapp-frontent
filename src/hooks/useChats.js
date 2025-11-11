import { useEffect,useState } from "react";

// Api Instance
import { GetUserChats } from "../api/Instance";

const useChats = () => {

    // States
    const [Data,SetData] = useState({
        ChatsError:null,
        ChatsLoading:false,
        FetchedChats:null
    });

    // These useEffect using for getting all chats
    useEffect( () => {

        // Delay fuction
        const Delay = (cb,delay) => new Promise( (resovle) => { setTimeout( () => resovle(cb()),delay)}); 

        const HandleFetchingChats = async () => {
            try {
                // SetData({FetchedChats:null,ChatsError:null,ChatsLoading:true});
                SetData( (...prev) => ({...prev,ChatsLoading:true}));
                const chatsResponse = await Delay( () => GetUserChats(),2000);
                if(chatsResponse.data?.statusCode === 200 && chatsResponse.data?.success === true && chatsResponse.data?.message === "Data fetched successfully."){
                    // SetData({FetchedChats:chatsResponse?.data?.data,ChatsError:null,ChatsLoading:false});
                    SetData( (...prev) => ({...prev,ChatsLoading:false,FetchedChats:chatsResponse?.data?.data}));
                    console.log(chatsResponse?.data?.data)
                    return chatsResponse?.data?.data;
                }else {
                    // SetData( (...prev) => ({...prev,ChatsLoading:false,FetchedChats:chatsResponse?.data?.data}));
                    SetData({FetchedChats:chatsResponse?.data?.data,ChatsError:"Error: some thing wrong",ChatsLoading:false});
                }
            } catch (error) {
                // SetData({FetchedChats:null,ChatsError:error?.response?.data || error?.response || error,ChatsLoading:false});
                SetData( (...prev) => ({...prev,ChatsLoading:false,ChatsError:error?.response?.data || error?.response || error}));
            }
        };

        const chatFetchingTimer = setTimeout(HandleFetchingChats,100);

        return () => {clearTimeout(chatFetchingTimer)};

    },[])

    return Data;
};

export default useChats;