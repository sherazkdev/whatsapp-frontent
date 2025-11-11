import React, { useEffect, useRef } from "react";

const ListImages = ({ media, currentMedia,HandleClickMedia }) => {

    return (
        <div className="w-full min-h-[100px] mb-[200px]">
            <div className="w-full">
                <div className="bg-[#0000001a] h-[1px] w-full"></div>
            </div>

            <section id="shared-images-list" className="w-full min-h-full max-h-full flex justify-center items-center">
                <div className="flex justify-center items-center w-full h-full gap-2 flex-wrap">
                {media?.map((item, index) => {
                    const isActive = index === currentMedia;
                    const isVideo = item?.type === "VIDEO";

                    return (
                    <div key={index}>
                        {isVideo ? (
                            <video
                                onClick={ () => HandleClickMedia(index)}
                                src={item?.media?.mediaUrl}
                                disablePictureInPicture
                                className={`w-[47px] h-[47px] object-cover rounded ${
                                isActive ? "border-[3px] border-blue-500" : ""
                                }`}
                            />
                        ) : (
                            <img
                                onClick={ () => HandleClickMedia(index)}
                                src={item?.media?.mediaUrl}
                                className={`w-[47px] h-[47px] object-cover rounded ${
                                isActive ? "border-[3px] border-blue-500" : ""
                                }`}
                                alt={media?.context}
                            />
                        )}
                    </div>
                    );
                })}
                </div>
            </section>
        </div>
    );
};

export default ListImages;
