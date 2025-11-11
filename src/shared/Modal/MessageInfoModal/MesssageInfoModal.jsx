import React, { useRef,useContext } from "react";
import {
  InfoRefreshed,
  ReplyRefreshed,
  IcMood,
  StarRefreshed,
  ForwardRefreshed,
  DeleteRefreshed,
  PinRefreshed,
} from "../../../assets/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { MessageContext } from "../../../context/MessageContext";

const MessageInfo = ({ MessageInfoRef, message, showPopup }) => {
  
  const {setReplyTo} = useContext(MessageContext);
  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          ref={MessageInfoRef}
          initial={{ opacity: 0, y: 10 }}     // Start below
          animate={{ opacity: 1, y: 0 }}     // Slide Up
          exit={{ opacity: 0, y: 10 }}       // Slide Down
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ul className="list-none">
            <li>
              <button className="flex gap-1 items-center p-1 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                <InfoRefreshed className="w-6 h-7 text-black-99" />
                <span className="text-15 text-black-99 font-normal">Message info</span>
              </button>
            </li>
            <li>
              <button onClick={ () => setReplyTo(message)} className="flex gap-1 items-center p-1 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                <ReplyRefreshed className="w-6 h-7 text-black-99" />
                <span className="text-15 text-black-99 font-normal">Reply</span>
              </button>
            </li>
            <li>
              <button className="flex gap-1 items-center p-1 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                <IcMood className="w-6 h-7 text-black-99" />
                <span className="text-15 text-black-99 font-normal">React</span>
              </button>
            </li>
            <li>
              <button className="flex gap-1 items-center p-1 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                <ForwardRefreshed className="w-6 h-7 text-black-99" />
                <span className="text-15 text-black-99 font-normal">Forward</span>
              </button>
            </li>
            <li>
              <button className="flex gap-1 items-center p-1 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                <PinRefreshed className="w-6 h-7 text-black-99" />
                <span className="text-15 text-black-99 font-normal">Pin</span>
              </button>
            </li>
            <li>
              <button className="flex gap-1 items-center p-1 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                <StarRefreshed className="w-6 h-7 text-black-99" />
                <span className="text-15 text-black-99 font-normal">Star</span>
              </button>
            </li>

            <hr className="text-neutral-light5 my-1" />

            <li>
              <button className="flex gap-1 items-center p-1 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                <DeleteRefreshed className="w-6 h-7 text-black-99" />
                <span className="text-15 text-black-99 font-normal">Delete</span>
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageInfo;
