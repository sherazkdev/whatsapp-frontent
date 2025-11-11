import { useState,useEffect } from "react";

/**
 * These Handler using for send message for example Text message media message  
*/

// Instance Handler
import { SendMessage, SendRepliedMessage } from "../api/Instance";

const useSendMessage = () => {

    // States
    const [Data,SetData] = useState({
        SendMessageLoading:false,
        SendMessageError:null,
        SendedMessage:null
    });

    // Send message Handler
    const HandleSendMessage = async (payload) => {
        try {
            SetData((...prev) => ({...prev,SendMessageLoading:true}));
            // message message
            const message = await SendMessage(payload);
            if(message?.data?.message === "Message sent successfully." && message?.data?.success === true && message?.data?.statusCode === 200){
                SetData((...prev) => ({...prev,SendedMessage:message?.data?.data,SendMessageLoading:false,SendMessageError:null}))
            }else {
                SetData((...prev) => ({...prev,SendedMessage:message?.data?.data,SendMessageLoading:false,SendMessageError:"Error: some thing wron"}))
            }
            
        } catch (error) {
            console.log(error)
            SetData((...prev) => ({...prev,SendMessageError:error?.response?.data?.message || error?.response?.message || error?.response || error || "Error: some thing",SendMessageLoading:false}));
        }
    };

    // return send message handler
    return {Data,HandleSendMessage};

};

export default useSendMessage;