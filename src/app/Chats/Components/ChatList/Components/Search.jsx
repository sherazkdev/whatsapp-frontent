import React, { useState } from "react";

// Icons 
import {SearchRefreshed} from "../../../../../assets/Icons";

const Search = () => {

    const [serachInputValue,setSearchInputValue] = useState(null);
    const [isFocused,setIsFocused] = useState(false);

    return (
        <div id="Search-contacts" className="w-full p-[0px_10px]">
            <form>
                <div onFocus={ () => setIsFocused(true) } onBlur={ () => setIsFocused(false)} className={` ${isFocused === true ? "border-2 border-black99 rounded-full" : "border-2 border-transparent"} max-w-[525px] h-[40px] flex justify-start space-x-2 relative items-start rounded-full bg-neutral-light5 hover:shadow-[0px_0px_0px_1px_#0003]`}>
                    <span className="absolute top-2 left-2"><SearchRefreshed className="text-gray"/></span>
                    <input type="text" className="w-full h-full outline-0 p-[0px_0px_0px_40px]" onChange={ (e) => setSearchInputValue(serachInputValue + e.target.value)} placeholder="Search or start new chat" />
                </div>
            </form>
        </div>
    )

};

export default Search;