import React, { useContext, useState,useEffect } from 'react';
import { createPortal } from 'react-dom';

// Components
import Previewer from './Components/Previewer/Previewer';
import TopHeader from './Components/TopHeader/TopHeader';
import ListImages from './Components/ListImages/ListImages';
import { MessageContext } from '../../../context/MessageContext';
const ImagePreviewer = ({clickedMedia,HandleCloseImagePreviewer}) => {

    const [currentMedia,setCurrentMedia] = useState(clickedMedia);

    /** Contexts */
    const {sharedMedia} = useContext(MessageContext);

    // Handle click media file
    const HandleClickMedia = (id) => setCurrentMedia(id);

    /* useEffect using for get clicked media by _id object id **/
    useEffect( () => {
        console.log(sharedMedia)
        const FindClickedMediaIndex = sharedMedia?.findIndex( (media) => media?._id?.toString() === clickedMedia?.toString());
        if(FindClickedMediaIndex === -1) return HandleCloseImagePreviewer();
        setCurrentMedia(FindClickedMediaIndex);
    },[]);

    const HandleNextButton = () => {
        setCurrentMedia((prevIndex) => {
            if (prevIndex >= sharedMedia.length - 1) {
                return 0;
            }
            return prevIndex + 1;
        });
    };

    const HandlePrevButton = () => {
        setCurrentMedia((prevIndex) => {
            if (prevIndex <= 0) {
                return media.sharedMedia - 1;
            }
            return prevIndex - 1;
        });
    };
    
    return createPortal(

        <div id="overlay" className='flex bg-white z-20 fixed top-0 left-0 w-full h-full'>
            <section id='image-previewer' className='grid grid-rows-[60px_1fr_100px] grid-cols-1 w-full h-screen'>
                <TopHeader media={sharedMedia[currentMedia]} HandleCloseImagePreviewer={HandleCloseImagePreviewer}/>
                <Previewer media={sharedMedia[currentMedia]} HandleNextButton={HandleNextButton} HandlePrevButton={HandlePrevButton} />
                <ListImages media={sharedMedia} currentMedia={currentMedia} HandleClickMedia={HandleClickMedia}/>
            </section>
        </div>, 
        document.body
    )
}

export default ImagePreviewer;
