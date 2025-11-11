import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;


export const SignInAndSendVerificationCode = async (payload) => {
    const response = await axios.patch(`${baseURL}/api/v1/users/signIn-send-otp`,{inputValue:payload.inputValue});
    return response;
}
export const SignInUserSendOtpAndVerifyOtp = async (payload) => {
    const response = await axios.patch(`${baseURL}/api/v1/users/sign-in`,{inputValue:payload.inputValue,otp:payload.otp},{withCredentials:true});
    return response;
}

export const HandleCheckLoggedInUser = async () => {
    const user = await axios.get(`${baseURL}/api/v1/users/current-user`,{withCredentials:true});
    return user;
};

// For getting all chats
export const GetUserChats = async () => {
    const chats = await axios.get(`${baseURL}/api/v1/chats/chats`,{withCredentials:true});
    return chats;
};

// Get all messages
export const GetUserChatMessages = async (payload) => {
    const chatMessages = await axios.get(`${baseURL}/api/v1/messages/get-user-messages?chatId=${payload.chatId}&page=${payload?.page}&limit=${payload?.limit}`,{withCredentials:true});
    return chatMessages;
};

export const SendMessage = async (payload) => {
    const sendedMessageResponse = await axios.post(`${baseURL}/api/v1/messages/send-message`,payload,{withCredentials:true});
    return sendedMessageResponse;
};

export const SendRepliedMessage = async (payload) => {
    const sendedRepliedMessageMessageResponse = await axios.post(`${baseURL}/api/v1/messages/reply-message`,payload,{withCredentials:true});
    return sendedRepliedMessageMessageResponse;
};

export const UpdateMessageSeenStatus = async (payload) => {
    const updateMessagesSeenStatues = await axios.patch(`${baseURL}/api/v1/messages/update-message-seen-status`,payload,{withCredentials:true});
    return updateMessagesSeenStatues;
};