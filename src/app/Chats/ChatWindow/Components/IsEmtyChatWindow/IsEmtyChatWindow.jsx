import React from 'react'

// Icons
import { LockOutlineIcon, StartChatIllustration } from "../../../../../assets/Icons";

const IsEmtyChatWindow = () => {
  return (
    <div className='w-full bg-neutral-light3 h-screen flex justify-center items-center'>
            
            {/* Page */}
            <div className='flex flex-col gap-16 justify-center items-center relative h-full'>
                
                <div className='flex justify-center items-center flex-col gap-10'>

                    <div>
                        <StartChatIllustration />
                    </div>
                    
                    <div className='flex justify-center flex-col gap-4 items-center'>
                        <div><h1 className='text-32 text-[#0A0A0A] font-thin'>WhatsApp Business on Web</h1></div>
                        <div><p className='text-[12px]'>Grow, organise and manage your business account.</p></div>
                    </div>

                </div>

                <div className='absolute bottom-5 w-full'>
                    <p className='flex gap-1 items-center justify-center'>
                        <span><LockOutlineIcon /></span>
                        <span className='text-[12px]'>Your personal messages are end-to-end encrypted</span>
                    </p>
                </div>
            
            </div>
            
    </div>
  )
}

export default IsEmtyChatWindow;
