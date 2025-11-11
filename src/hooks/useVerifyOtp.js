import React, { useState } from "react";

// Api Instance and Handlers
import { SignInUserSendOtpAndVerifyOtp, } from "../api/Instance";

const useVerifyOtp = () => {

    // States
    const [Data,setData] = useState({
        OtpVerificationLoading:false,
        OtpVerificationError:null,
        OtpVerificationUser:null,
    });

    // SignIn Handler
    const HandleSignInUserVerifyOtp = async (payload) => {
        try {
            console.log(payload)
            setData({OtpVerificationUser:null,OtpVerificationLoading:true,OtpVerificationError:null})
            const signInUserAndVerifyOtpResponse = await SignInUserSendOtpAndVerifyOtp(payload);
            console.log(signInUserAndVerifyOtpResponse)
            if(signInUserAndVerifyOtpResponse.data?.statusCode === 200 && signInUserAndVerifyOtpResponse?.data?.success === true && signInUserAndVerifyOtpResponse.data?.message === "User logged in successfully."){
                setData({OtpVerificationUser:signInUserAndVerifyOtpResponse.data.data,OtpVerificationLoading:false,OtpVerificationError:null});
                return signInUserAndVerifyOtpResponse.data;
            }else{
                setData({OtpVerificationUser:signInUserAndVerifyOtpResponse.data,OtpVerificationLoading:false,OtpVerificationError:"Error: Some thing wrong"})
                return signInUserAndVerifyOtpResponse.data;
            }
        } catch (error) {
            setData({OtpVerificationUser:null,OtpVerificationLoading:false,OtpVerificationError:error?.response?.data || error?.response || error});
        }
    };

    // return hook Handlers
    return {Data,HandleSignInUserVerifyOtp};

};


export default useVerifyOtp;