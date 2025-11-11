import React,{useState} from "react";

/** Api Instance */
import {UpdateMessageSeenStatus} from "../api/Instance";

const useUpdateMessagesSeenStatus = () => {
    /** States Variables */
    const [Data,SetData] = useState({
        UpdateMessagesError:null,
        UpdateMessagesLoading:false,
        UpdateMessages:null
    });

    /** Update Messages Handler updater */
    const HandleUpdateMessagesSeenStatus = async (payload) => {
        try {
            console.log(payload)
            SetData( (prevVal) => ({...prevVal,UpdateMessagesLoading:true}));
            const updateMessages = await UpdateMessageSeenStatus(payload);
            console.log(updateMessages);
            if(updateMessages?.data?.statusCode === 200 && updateMessages?.data?.message === "Message seen status updated." && updateMessages?.data?.success === true){
                SetData( (prevVal) => ({...prevVal,UpdateMessagesLoading:false,UpdateMessages:updateMessages?.data?.data}));
                return true;
            }else {
                SetData( (prevVal) => ({...prevVal,UpdateMessagesLoading:false,UpdateMessages:updateMessages?.data?.data,UpdateMessagesError:"Error: some thing wrong in messages"}));
                return false;
            }
        } catch (e) {
            console.log(e)
            SetData( (prevVal) => ({...prevVal,UpdateMessagesError:e?.response?.data || e?.response || e || "Error: some thing wrong",UpdateMessagesLoading:false}));
        }
    };

    /** Return hook handlers */
    return {UpdateMessageDetails:Data,HandleUpdateMessagesSeenStatus};
};

export default useUpdateMessagesSeenStatus;