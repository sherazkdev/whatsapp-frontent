import React from "react";
import {
  WAWordmarkRefreshed,
  NewChatOutline,
  MoreRefreshed,
} from "../../../../assets/Icons";

const TopHeader = () => {
  return (
    <header className="flex w-full items-start justify-start px-5 py-2.5">
        {/* Left Logo */}
        <section id="left-logo-section" className="flex-1">
            <h1 className="mt-[8px_!important]">
                <WAWordmarkRefreshed className="h-6 w-auto" />
            </h1>
        </section>

        {/* Right Buttons */}
        <section id="right-button-section" className="flex items-center justify-center gap-2 max-w-[90px]" >
            <button
                aria-label="New Chat"
                className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]">
                <NewChatOutline className="max-h-6 max-w-6" />
            </button>
            <button
                aria-label="More Options"
                className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-full hover:bg-[#f9f8f8]">
                <MoreRefreshed className="max-h-6 max-w-6" />
            </button>
        </section>

    </header>
  );
};

export default TopHeader;
