import React, { useState } from "react";
import { SignInAndSendVerificationCode } from "../api/Instance";

// Api Instance and Handlers


const useSignIn = () => {

    // States
    const [Data,setData] = useState({
        SignInUserLoading:false,
        SignInUserError:null,
        SignInUser:null,
    });

    // SignIn Handler
    const HandleSignInUser = async (payload) => {
        try {
            setData({SignInUser:null,SignInUserLoading:true,SignInUserError:null})
            const signInUserResponse = await SignInAndSendVerificationCode(payload);
            if(signInUserResponse.data?.successCode === 200 && signInUserResponse?.data?.success === true){
                setData({SignInUser:signInUserResponse.data.data,SignInUserLoading:false,SignInUserError:null});
                return signInUserResponse.data;
            }else{
                setData({SignInUser:signInUserResponse.data,SignInUserLoading:false,SignInUserError:"Error: Some thing wrong"})
                return signInUserResponse.data;
            }
        } catch (error) {
            setData({SignInUser:null,SignInUserLoading:false,SignInUserError:error?.response?.data || error?.response || error});
        }
    };

    // return hook Handlers
    return {Data,HandleSignInUser};

};


export default useSignIn;