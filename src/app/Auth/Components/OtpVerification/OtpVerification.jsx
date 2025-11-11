import React, { useEffect, useState } from "react";

// Icons 
import { InfoOutline } from "../../../../assets/Icons";

// Components
import OTPInput from "./Components/OtpInput";
import useVerifyOtp from "../../../../hooks/useVerifyOtp";

const OtpVerification = ({selectedCountry,phoneNumber}) => {

  // States
  const [filledOtp,setFilledOtp] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

  // Hooks for using veify otp
  const {Data,HandleSignInUserVerifyOtp} = useVerifyOtp();

  // These useEffect using for error Hanling
  useEffect( () => {
    if(Data.OtpVerificationError !== null){
      if(Data.OtpVerificationError?.message === "User not found." && Data.OtpVerificationError?.statusCode === 404){
        setError("Error: User not found");
      }else if(Data.OtpVerificationError?.message === "Invalid OTP entered." && Data.OtpVerificationError?.statusCode === 401){
        setError("Error: Invalid OTP");
      }else if(Data.OtpVerificationError?.message === "OTP has expired. Please request again." && Data.OtpVerificationError?.statusCode === 401){
        setError("Error: OTP expired");
      }else {
        setError(error)
      }
    }
  },[Data.OtpVerificationError]);

  // Handle Complete filled otp
  const onComplete = async (otp) => {
    // check otp is filled 6 character
    if(otp?.length !== 6) return;
    await setFilledOtp(otp);
    HandleVerifyOtp();
  }

  // Delay the fuction for animation
  const Delay = (cb, delay = 500) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(cb());
      }, delay);
  });  
  // Handle Veify Otp
  const HandleVerifyOtp = async () => {
    try {
      const filterdPhoneNumber = selectedCountry.code + phoneNumber;
      const removingAllSpaces = filterdPhoneNumber.replaceAll(" ","");
      console.log(filledOtp)
      if(filledOtp?.length !== 6) {
        console.log(filledOtp)
        return false;
      };
      // Veify otp payload
      const SignInUserDetails = {
        inputValue:removingAllSpaces,
        otp:filledOtp
      };
      // These useEffect using for animation
      setLoading(true);
      const verifyOtpResponse = await Delay( () => HandleSignInUserVerifyOtp(SignInUserDetails),5000);
      setLoading(false);
      if(verifyOtpResponse?.message === "User logged in successfully." && verifyOtpResponse?.success === true && verifyOtpResponse?.statusCode === 200){
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
      setError(error?.message);
    }
  };

  return (
        /* Center section */
        
        <section className='w-full flex justify-center items-start'>
          {loading && (<div class="loading">Loading&#8230;</div>)}
          <div className='w-[40%] h-full min-h-[500px] border-1 bg-[#ffffff] flex flex-col justify-start gap-10 items-left p-[20px_!important] mt-[100px_!important] gap-2 rounded-xl border-[#111B21]'>

              <div id="top" className='flex justify-center flex-col gap-1'>  
                <h1 className='text-32 text-left'>Enter code on Email Address</h1>
                
                <div className='flex items-center gap-1'>
                  <p className='text-18 text-left'>Linking WhatsApp account </p>
                  <strong className='mt-[1px_!important]'>{selectedCountry.code + phoneNumber}</strong>
                  <button className='text-[#357f69] cursor-pointer'>(edit)</button>
                </div>
              </div>

              <div className='w-full h-[150px] flex flex-col gap-6'>
                <div className='flex  justify-center w-full bg-neutral-light5'>
                  <OTPInput onComplete={onComplete}/>
                </div>
                {error !== null && (
                  <>
                    <span className='flex gap-1 items-center'><InfoOutline size={16} className='text-red-500' /> <span className='text-red-500 text-14 font-normal  '>{error}</span></span>
                  </>
                )}
                <div className='flex justify-center  w-full '>
                  <button className='bg-[#357f69] text-white font-medium hover:bg-[#017561] p-[8px_20px_!important] text-15 rounded-full'>Verify</button>
                </div>
              </div>
              
              <div id="not" className='flex gap-1 items-start'>
                <span className='mt-[3px_!important]'><InfoOutline size={16} className='text-black-99' /></span>
                <p className='text-14 font-normal text-black-99'>We’re sorry, but due to a technical issue your verification code could not be sent to your phone number.Please check the email you used to create your account — the verification code may have been sent there.</p>
              </div>
              
          </div>
        </section>
  )
}

export default OtpVerification;