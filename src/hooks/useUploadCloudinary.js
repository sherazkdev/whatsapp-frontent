import axios from "axios";
import React,{useEffect,useState} from "react";

const useUploadCloudinary = (payload) => {
    
    // States
    const [Data,SetData] = useState({
        UploadFileLoading:false,
        UploadFileError:null,
        UploadedFile:null
    });

    /**
     * 1: These useEffect using for video file || image uploading on cloud 
    */
   useEffect( () => {

        // Handle Upload Media File
        const HandleUploadFile = async () => {
            try {
                SetData( (prevVars) => ({...prevVars,UploadFileLoading:true}));
                let UploadedFile = null;
                if(payload.type.includes("video") === true){
                    UploadedFile = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/video/upload`,payload?.formData);
                }else if(payload.type.includes("image") === true){
                    UploadedFile = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,payload?.formData);
                }else {
                    SetData( (prevVars) => ({...prevVars,UploadFileError:"Error: Invalid File Type",UploadFileLoading:false}));
                    return false;
                }
                if(UploadedFile?.data !== null){
                    SetData( {UploadedFile:UploadedFile.data,UploadFileError:null,UploadFileLoading:false});
                    return true;
                }else {
                    SetData( {UploadedFile:UploadedFile.data,UploadFileError:"Error: Some thing wrong",UploadFileLoading:false});
                    return false;
                }
            } catch (error) {
                SetData( (prevVars) => ({...prevVars,UploadFileError:error?.response?.data || error?.response || error,UploadFileLoading:false}));
            }
        };

        // Set timer for clean up function
        const timer = setTimeout( HandleUploadFile,100);
        return () => clearTimeout(timer);
   },[payload])

   return Data;
};

export default useUploadCloudinary;