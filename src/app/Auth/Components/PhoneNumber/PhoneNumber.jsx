import React,{useEffect, useState} from "react";

// Icons 
import { InfoOutline,SearchRefreshedThin,ChevronIcon,MsgSendIcon } from "../../../../assets/Icons";

// Services
import useSignIn from "../../../../hooks/useSignIn";
import { useForm } from "react-hook-form";

const PhoneNumber = ({phoneNumber,setPhoneNumber,selectedCountry,setSelectCountry,setNextStep}) => {
  const [countries,setCountries] = useState([
    {
      code:"+98",
      flag:"https://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/48/Iran-Flag-icon.png",
      name:"Iran"
    },
    {
      code:"+92",
      flag:"https://icons.iconarchive.com/icons/wikipedia/flags/48/PK-Pakistan-Flag-icon.png",
      name:"Pakistan",
    },
    {
      code:"+966",
      flag:"https://icons.iconarchive.com/icons/wikipedia/flags/48/AE-United-Arab-Emirates-Flag-icon.png",
      name:"United Arab Emirates",
    },
    {
      code:"+91",
      flag:"https://icons.iconarchive.com/icons/wikipedia/flags/48/IN-India-Flag-icon.png",
      name:"Inda",
    },
    {
      code:"+1",
      flag:"https://icons.iconarchive.com/icons/wikipedia/flags/48/US-United-States-Flag-icon.png",
      name:"United States"
    },
  ]);

  // Hooks
  const { register, handleSubmit, setError,watch, formState: { errors } } = useForm();
  const {Data,HandleSignInUser} = useSignIn();

  // For error handling using these useEffect Hook
  useEffect( () => {
    if(Data.SignInUserError !== null){
      if(Data.SignInUserError?.statusCode === 404 && Data.SignInUserError?.message === "User not found.")
      setError("inputValue",{message:Data.SignInUserError?.message})
    }
  },[Data.SignInUserError])

  const [searchCountryInput,setSearchCountry] = useState('');
  const [showSelectCountry,setShowSelectCountry] = useState(false);
  const HandleClickSelectCountry = (countryName) => {
    const [country] = countries.filter( (c) => c.name === countryName);
    setSelectCountry(country);
    setShowSelectCountry(false)
  };
  const FilterCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchCountryInput.toLowerCase())
  );
  const HandleShowCoutriesList = () => setShowSelectCountry(!showSelectCountry);
  const handlePhoneNumberInputChange = (e) => {
        const input = e.target.value;
    
        // Prevent removing the country code
        if (!input.startsWith(selectedCountry.code)) return;
    
        // Remove the code and space, store only the number part
        const number = input.slice(selectedCountry.code.length).trimStart();
        setPhoneNumber(number);
  };
  const HandleSearchCountry = (e) => setSearchCountry(e.target.value)
  const Delay = (cb, delay = 500) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(cb());
      }, delay);
  });  
  const HandleSubmitPhoneNumber = async (payload) => {
    try {
      const replaceAllSpacesForPhoneNumber = payload.inputValue.replaceAll(" ","");
      const signInUserPayload = {
        inputValue:replaceAllSpacesForPhoneNumber
      };
      const signUserSendOtp = await Delay( () => HandleSignInUser(signInUserPayload),500);
      if(signUserSendOtp.statusCode === 200 && signUserSendOtp.message === "Success: Otp Sended Successfully" && signUserSendOtp.success === true){
        setNextStep("VERIFICATION");
      }
    } catch (error) {
      setError("inputValue",{message:error?.message});
    }
  };
    
    return (
        /* Center section */
        <section className='w-full flex justify-center items-start'>
          {/* <div> */}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit(HandleSubmitPhoneNumber)} className='w-[40%] h-full min-h-[500px] border-1 bg-[#ffffff] flex flex-col justify-center gap-8 items-center p-[20px_!important] mt-[100px_!important] rounded-xl border-[#111B21]'>
              
              {/* top section */}
                <div id="top" className='flex flex-col gap-2'>  
                  <h1 className='text-32 text-center text-[#111B21]'>Enter phone number</h1>
                  
                  <p className='text-18 text-center text-[#111B21]'>Select a country and enter your phone number.</p>
                </div>
              {/* top section ended */}

              {/* center section */}
                <div className='flex flex-col gap-3'>
                  {/* select country section */}
                    <div id="select-country" className='relative'>

                      <div id='select-input' className=''>
                        <button type="button" onClick={HandleShowCoutriesList} className='w-[320px] h-[52px] p-[10px_30px_!important] flex items-center justify-between  border border-[#0A0A0A] rounded-full'>
                          {selectedCountry !== null && (
                            <>
                              <div className='flex gap-2 items-center'>
                                {/* flag */}
                                <span><img src={selectedCountry.flag} alt={selectedCountry.name} className='w-5 h-5' /></span>

                                {/* country name */}
                                <span className='text-15 font-medium text-[#111B21]'>{selectedCountry.name}</span>
                              </div>
                              
                              {/* country code */}
                              <span className='rotate-90 text-[#111B21]'><ChevronIcon /></span>
                            </>
                          )}
                          {selectedCountry === null && (
                            <p>Select a counntry</p>
                          )}
                        </button>
                      </div>
                      {showSelectCountry && (
                        <div id="countries" className='absolute min-w-[300px] top-14 left-1 flex flex-col gap-1 w-fit h-fit bg-white shadow-[0px_1px_3px_2px_#d9d9d9] p-[10px_!important] rounded-xl z-10'>
                          <div id="search" className='relative w-full'>
                            <input type="text" onChange={HandleSearchCountry} value={searchCountryInput} className='w-full rounded-lg text-15 text-[#54656f] font-medium p-[5px_30px_!important] bg-neutral-light5 outline-none' />
                            <span className=' absolute top-2 left-1'>
                              <SearchRefreshedThin className="text-[#8d9599]" />
                            </span> 
                          </div>
                          <div id="coutries-list" className='w-full'>
                            {FilterCountries.map( (c) => (
                              <button type="button" onClick={ () => HandleClickSelectCountry(c.name)} className='p-[10px_!important] w-full flex items-center hover:bg-neutral-light5 rounded-xl cursor-pointer justify-between'>
                                <div className='flex gap-2 items-center w-[215px]'>
                                  {/* flag */}
                                  <span><img src={c.flag} alt={c.name} className='w-5 h-5' /></span>

                                  {/* country name */}
                                  <span className='text-14 font-medium text-[#111B21]'>{c.name}</span>
                                </div>
                                
                                {/* country code */}
                                <span>{selectedCountry?.name === c.name  ? <MsgSendIcon className='text-[#008069]'/> : c.code }</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  {/* ended select country section */}

                  <div id="inputPhoneOrEmail">
                    <input {...register("inputValue",{required:{value:true,message:"Phone number is required"},minLength:{value:11,message:"Valid phone number is required."}})} type="text" value={`${selectedCountry?.code || ""} ${phoneNumber}`} onChange={handlePhoneNumberInputChange} className='w-[320px] h-[52px] p-[10px_30px_!important] border border-[##3b3b3b] outline-[#357f69] focus:outline focus:outline-[1px] rounded-full'/>
                  </div>
                </div>
              {/* center section ended */}
              
              {/* last section */}
                <div className='flex gap-1 items-center p-[10px_!important] rounded-lg'> {errors?.inputValue && <span className='flex gap-1 items-center bg-[#FDE8EB] p-[10px_!important] rounded-lg'><InfoOutline size={16} className='text-[#B80531]' /> <span className='text-[#B80531] text-14 font-normal  '>{errors.inputValue?.message}</span></span>}</div>
                <button type="submit" className='bg-[#357f69] text-white font-medium hover:bg-[#017561] p-[8px_20px_!important] text-15 rounded-full' disabled={Data.SignInUserLoading}>{Data.SignInUserLoading === true ? 'Loading...' : 'Next'}</button>
              {/* Last section ended */}

            </form>
            {/* Sign In Form ended */}

          {/* </div> */}
        </section>
    )
};

export default PhoneNumber;