import React, { useContext, useRef, useState } from 'react';

// Icons
import {PlusRounded,InfoRefreshed,ReplyRefreshed,IcMood,ForwardRefreshed,PinRefreshed,StarRefreshed,DeleteRefreshed,DocumentRefreshedThin,PersonFilledRefreshed,MediaFolderRefreshedIcon,CameraFilledRefreshed,StorefrontIcon,BoltIcon,CalendarIcon,CameraIcon,StickerCreateIcon,PollIcon,HeadphonesIcon} from "../../../../../../../../assets/Icons";
import UploadPopup from './Components/UploadPopup';

// Components
import { UIContext } from '../../../../../../../../context/UIContext';
const Upload = () => {

    const [activeButton,setActiveButton] = useState(false);
    const fileInputRef = useRef(null);
    const HandleClickUploadButton = () => {
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    };

    const {setUploadFile} = useContext(UIContext);

    const HandleFileUploaded = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        
        // Envormants variables
        const CLOUD_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

        // Appends files
        formData.append("file",file);
        formData.append("upload_preset",CLOUD_UPLOAD_PRESET);
        
        const url = URL.createObjectURL(file);
        const uploadedFileObject = {
            url: url,
            formData:formData,
            type:file.type 
        }
        setActiveButton(false);
        setUploadFile(uploadedFileObject);
    };

    const HandleShowUploadPopup = () => setActiveButton(!activeButton);


    return (
        <>
            {activeButton && (
                <UploadPopup HandleFileUploaded={HandleFileUploaded} />
            )}
            <button onClick={HandleShowUploadPopup} className={`flex h-10 w-10 items-center justify-center cursor-pointer transition-all delay-100 rounded-full ${activeButton ? `bg-[#f9f8f8] rotate-[45deg]` : `hover:bg-[#f9f8f8]`}`}>
                <PlusRounded />
            </button>
        </>
    );
}

export default Upload;
