import React from 'react';

const Links = () => {
    return (
        <div id="buttons" className="flex gap-2 p-[0px_10px]">
            <button className="bg-[#f6f5f4] p-[6px_12px_!important] cursor-pointer text-[15px] text-[#606060] border border-[#e5e5e5] rounded-full">All</button>
            <button className="bg-[#fff] hover:bg-[#f6f5f4] cursor-pointer p-[6px_12px_!important] text-[15px] text-[#606060] border border-[#e5e5e5] rounded-full">Unread</button>
            <button className="bg-[#fff] hover:bg-[#f6f5f4] cursor-pointer p-[6px_12px_!important] text-[15px] text-[#606060] border border-[#e5e5e5] rounded-full">Favorites</button>
            <button className="bg-[#fff] hover:bg-[#f6f5f4] cursor-pointer p-[6px_12px_!important] text-[15px] text-[#606060] border border-[#e5e5e5] rounded-full">Groups</button>
        </div>
    );
}

export default Links;
