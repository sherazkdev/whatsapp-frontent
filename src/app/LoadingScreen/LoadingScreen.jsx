import React, { useState, useEffect } from 'react';
import { LockOutlineIcon, WhatsAppSvg } from '../../assets/Icons';

export default function LoadingScreen() {
  const totalItems = 230; // total chats/messages
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem(prev => {
        if (prev < totalItems) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 20); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-neutral-light1 w-full flex justify-center gap-4  items-center flex-col h-screen'>
      <div className='ml-[200px_!important] flex flex-col gap-2 '>
        <span>
            <WhatsAppSvg className="text-black-1a" />
        </span>
        <h3 className='ml-[-10px_!important]'>WhatsApp</h3>
      </div>

      {/* loading */}
      <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#357f69] transition-all duration-100"
          style={{ width: `${(currentItem / totalItems) * 100}%` }}
        ></div>
      </div>

      {/* label */}
      <div>
        <p className='flex gap-1 text-black-99'>
          <span><LockOutlineIcon /></span>
          <span>End-to-end encrypted</span>
        </p>
      </div>
    </div>
  );
}
