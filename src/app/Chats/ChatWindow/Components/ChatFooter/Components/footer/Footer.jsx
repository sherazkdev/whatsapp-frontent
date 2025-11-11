import React,{useState,useEffect,useContext} from "react";

// Components
import Input from "../InputBar/Input";
import Emoji from "../Buttons/Emoji/Emoji";
import Upload from "../Buttons/Upload/Upload";
import Voice from "../Buttons/Voice/Voice";

const Footer = ({HandleClickOnEmoji,inputValue,setInputValue}) => {

    return (
        <footer className="flex gap-2 items-center">
            
            {/* upload button */}
            <Upload />

            {/* emoji button */}
            <Emoji HandleClickOnEmoji={HandleClickOnEmoji} />

            {/* input bar */}
            <Input inputValue={inputValue} setInputValue={setInputValue} />

            {/* send or voice button */}
            <Voice />

        </footer>
    )
};

export default Footer;