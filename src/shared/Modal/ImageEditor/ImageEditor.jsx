import { useContext, useEffect, useState } from 'react'

// Icons
import { CloseIcon,HdSettingsIcon,EditIcon,CropSquareIcon,IcMood,StickerIcon,MatchCaseIcon,WandIcon,CropRotateFilled, BlurOnIcon, DownloadRefreshedIcon, SendFilledIcon } from "../../../assets/Icons";

import EmojiPicker from 'emoji-picker-react'
import { UIContext } from '../../../context/UIContext';
import {ChatContext} from "../../../context/ChatContext";
import useUploadCloudinary from '../../../hooks/useUploadCloudinary';
import useSendMessage from '../../../hooks/useSendMessage';

function ImageEditor({HandleCloseUploadModal}) {
  // Contexts Providers
  const {uploadFile} = useContext(UIContext);
  const {selectedChat} = useContext(ChatContext);

  const [activeEmojiPicker,setActiveEmojiPicker] = useState(false);
  const [inputValue,setInputValue] = useState("");
  const [error,setError] = useState(null);

  const HandleClickEmoji = (data) => setInputValue( (prevVal) => prevVal + data.emoji);
  const HandleUpdateInputValue = (e) => setInputValue(e.target.value);
  const HandleShowEmojiModal = () => setActiveEmojiPicker(!activeEmojiPicker);
  
  // Hooks for using file uploading
  const {UploadFileError,UploadedFile,UploadFileLoading} = useUploadCloudinary(uploadFile);
  const {HandleSendMessage} = useSendMessage();

  /**
   * 1: These useEffect using for error Handling
   * 2: And second one useEffect using for animation and loading
   * 3: Third useEffect using for real time cloud response 
  */

  // 1: These useEffect using for error Handling
  useEffect( () => {
    if(UploadFileError !== null){
      setError(UploadFileError);
    }
  },[UploadFileError])
  
  // 2: And second one useEffect using for animation and loading
  useEffect( () => {
    console.log(UploadedFile);
  },[UploadedFile])
  
  // 3: Third useEffect using for real time cloud response
  useEffect( () => {
    console.log(UploadFileLoading)
  },[UploadFileLoading])

  // Handle On Submit or send
  const HandleOnSend = async () => {
    try {
      const messagePayload = {};
      if(uploadFile?.type?.includes("video") === true){
        messagePayload.type = "VIDEO";
        messagePayload.content = inputValue.toString().trim();
        messagePayload.chatId = selectedChat?._id;
        messagePayload.mediaUrl = UploadedFile.secure_url;
        messagePayload.filename = `${Date.now()}-video-whatsapp-pk.mp4`;
        messagePayload.chatId = selectedChat?._id;
      }else if(uploadFile?.type?.includes("image") === true){
        messagePayload.type = "IMAGE";
        messagePayload.content = inputValue.toString().trim();
        messagePayload.chatId = selectedChat?._id;
        messagePayload.mediaUrl = UploadedFile.secure_url;
        messagePayload.filename = `${Date.now()}-video-whatsapp-pk.jpg`;
        messagePayload.chatId = selectedChat?._id;
      }
      console.log(messagePayload)
      const sendedMessage = await HandleSendMessage(messagePayload);
      console.log(sendedMessage);
      HandleCloseUploadModal();
    } catch (error) {
      console.log(error)
      setError(error?.messsage || error)
    }
  };
  

  return (
    <>
    <section className="w-full absolute top-0 left-0 bg-white h-screen grid grid-rows-[1fr_150px]">
      <section id='top-sectiom' className='grid grid-rows-[72px_1fr_72px]'>
        
        {/* TOP BAR */}
        <header className="flex justify-between items-center w-full h-[72px] p-[8px_16px_!important]">
          {/* Left, Close Button */}
          <button onClick={HandleCloseUploadModal} className='text-black-99 flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
            <CloseIcon />
          </button>

          {/* Right, Buttons Group */}
          <div className="flex text-black-99 gap-6">
            
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <CropRotateFilled />
            </button>
            
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <WandIcon />
            </button>
            
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <EditIcon />
            </button>
            
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <MatchCaseIcon />
            </button>
            
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <CropSquareIcon />
            </button>
            
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <BlurOnIcon />
            </button>
            
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <IcMood />
            </button>
                
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <StickerIcon />
            </button>
                
            <button className='flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
              <HdSettingsIcon />
            </button>
          </div>

          <button className='text-black-99 flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]'>
            <DownloadRefreshedIcon />
          </button>
        </header>

        {/* MAIN */}
        <main className="flex justify-center items-center w-full h-full">
          {/* Image Editor */}
          {uploadFile?.type?.includes("image") && (
            <img src={uploadFile.url} alt="" className='w-fit shadow-sm h-screen max-h-[600px]'/>
          )}
          {uploadFile?.type?.includes("video") && (
            <video src={uploadFile.url} controls className='w-fit shadow-sm h-screen max-h-[600px]'></video>
          )} 
        </main>

        {/* Content input */}
        <div className="flex justify-center items-center w-full">
          <div id="input" className='relative'>
            <input type="text" id="content" value={inputValue} onChange={HandleUpdateInputValue} placeholder='Type a message' className='w-[700px] h-10 outline-none p-[10px_!important] rounded-md bg-neutral-light5' />
            <button onClick={HandleShowEmojiModal} className='text-black-99 cursor-pointer absolute top-2 right-2 '>
              <IcMood />
            </button>

            <div className={` ${activeEmojiPicker ? "flex" : "hidden"} absolute w-10/12 h-10/3 bottom-[360px] left-[650px] shadow`}>
                <EmojiPicker onEmojiClick={HandleClickEmoji}/>
            </div>

            
          </div>
            
        </div>
      
      </section>

      {/* BOTTOM BAR (Always with content, no scroll issue) */}
      <footer className='flex justify-between h-[100px] items-center border-t border-neutral-light4 w-full p-[8px_16px_!important]'>
        {/* Bottom controls */}
        <div></div>

        <div className="flex justify-center items-center w-full h-full gap-2 flex-wrap">
          <div className='w-13 h-13 overflow-hidden object-cover'>
            {uploadFile?.type?.includes("image") && (
              <img src={uploadFile.url} alt="" className='w-full h-full object-cover object-center'/>
            )}
            {uploadFile?.type?.includes("video") && (
              <video src={uploadFile.url} disablePictureInPicture className='w-full h-full object-cover object-center'></video>
            )} 
          </div>
        </div>
        
        <div >
          <button onClick={HandleOnSend} className='p-[15px_!important] mb-[5px_!important] rounded-full text-white bg-black'>
            <SendFilledIcon />
          </button>
        </div>
      </footer>

    </section>
    </>
  )
}


export default ImageEditor;
