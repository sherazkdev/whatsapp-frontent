import React from "react";

const Footer = () => {

    return (
        <section className='flex w-full justify-center gap-4 mt-[20px_!important] flex-col items-center'>
        
        {/* new account opening */}
        <div className='flex gap-1'>
          <h2 className='text-18'>Don't have WhatsApp account? </h2>
          <a href="#" className='relative text-16 after:content-[] flex gap-1 items-center hover:text-[#60d168] after:w-20 after:h-[2px] after:bg-[#60d168] after:absolute after:left-0 after:bottom-[-3px] '>Get stated <span><ArrowOutIcon /></span></a>
        </div>

        {/* terms */}
        <div className='flex gap-1 text-black-99 items-center'>
          <span><LockOutlineIcon /></span>
          <span className='text-16 font-normal'>Your personal messages are end-to-end encrypted</span>
        </div>

        {/* terms */}
        <div>
          <button className='text-13 font-normal text-black-99'>Terms & Privacy Policy</button>
        </div>
        </section>
    )

};

return Footer;