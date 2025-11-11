import React,{useState,useEffect,useContext} from "react";

// Components
import Footer from "./Components/footer/Footer.jsx"
import ReplyOverlay from "./Components/InputBar/components/replyOverlay.jsx";
import { MessageContext } from "../../../../../context/MessageContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

/** Contexts */

const ChatFooter = () => {
    const [inputValue,setInputValue] = useState("");

    const {replyTo,setReplyTo} = useContext(MessageContext);
    const HandleClickOnEmoji = (emoji) => setInputValue( (prevValue) => (prevValue + emoji?.emoji));

    return (
        <section id="chat-footer" className={`w-[98%] !m-auto p-[5px] shadow-sm ${replyTo !== null ? `rounded-br-4xl rounded-bl-4xl rounded-tl-xl rounded-tr-xl` : `rounded-full`} z-10 !bg-white !mb-2`}>
            {replyTo !== null && (
                
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}      // Start below
                        animate={{ opacity: 1, y: 0 }}     // Slide Up
                        exit={{ opacity: 0, y: 10 }}       // Slide Down
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <ReplyOverlay message={replyTo}/>
                    </motion.div>
                </AnimatePresence>
            )}
            <Footer HandleClickOnEmoji={HandleClickOnEmoji} inputValue={inputValue} setInputValue={setInputValue}/>
        </section>
    )
};
export default ChatFooter;