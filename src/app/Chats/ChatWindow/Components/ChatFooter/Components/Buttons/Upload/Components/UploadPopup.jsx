import React,{useRef,useState} from "react";

import { motion,AnimatePresence } from 'framer-motion';

const UploadPopup = ({HandleFileUploaded}) => {

    const fileInputRef = useRef(null);
  
    const HandleClickUploadButton = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}    
                exit={{ opacity: 0, y: 10 }}     
                transition={{ duration: 0.2, ease: "easeOut" }}
                className='absolute left-0 w-[200px] bottom-12 p-2 rounded-md bg-white z-20'
            >
                <ul className="list-none">

                    <li>
                        <button onClick={HandleClickUploadButton} className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" height="24" width="24" color='#7f66ff' preserveAspectRatio="xMidYMid meet" class="x19mqsdy" fill="none"><title>document-filled-refreshed</title><path d="M9 18H15C15.2833 18 15.5208 17.9042 15.7125 17.7125C15.9042 17.5208 16 17.2833 16 17C16 16.7167 15.9042 16.4792 15.7125 16.2875C15.5208 16.0958 15.2833 16 15 16H9C8.71667 16 8.47917 16.0958 8.2875 16.2875C8.09583 16.4792 8 16.7167 8 17C8 17.2833 8.09583 17.5208 8.2875 17.7125C8.47917 17.9042 8.71667 18 9 18ZM9 14H15C15.2833 14 15.5208 13.9042 15.7125 13.7125C15.9042 13.5208 16 13.2833 16 13C16 12.7167 15.9042 12.4792 15.7125 12.2875C15.5208 12.0958 15.2833 12 15 12H9C8.71667 12 8.47917 12.0958 8.2875 12.2875C8.09583 12.4792 8 12.7167 8 13C8 13.2833 8.09583 13.5208 8.2875 13.7125C8.47917 13.9042 8.71667 14 9 14ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H13.175C13.4417 2 13.6958 2.05 13.9375 2.15C14.1792 2.25 14.3917 2.39167 14.575 2.575L19.425 7.425C19.6083 7.60833 19.75 7.82083 19.85 8.0625C19.95 8.30417 20 8.55833 20 8.825V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 8C13 8.28333 13.0958 8.52083 13.2875 8.7125C13.4792 8.90417 13.7167 9 14 9H18L13 4V8Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Document</span>
                        </button>
                    </li>

                    <li>
                        <button onClick={HandleClickUploadButton} className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" color='#007bfc' class="xihbb3s" fill="none"><title>media-filled-refreshed</title><path d="M13.25 12.5L12.1 11C12 10.8667 11.8667 10.8 11.7 10.8C11.5333 10.8 11.4 10.8667 11.3 11L9.625 13.2C9.49167 13.3667 9.47083 13.5417 9.5625 13.725C9.65417 13.9083 9.80833 14 10.025 14H17.975C18.1917 14 18.3458 13.9083 18.4375 13.725C18.5292 13.5417 18.5083 13.3667 18.375 13.2L15.95 10.025C15.85 9.89167 15.7167 9.825 15.55 9.825C15.3833 9.825 15.25 9.89167 15.15 10.025L13.25 12.5ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V7C2 6.71667 2.09583 6.47917 2.2875 6.2875C2.47917 6.09583 2.71667 6 3 6C3.28333 6 3.52083 6.09583 3.7125 6.2875C3.90417 6.47917 4 6.71667 4 7V20H17C17.2833 20 17.5208 20.0958 17.7125 20.2875C17.9042 20.4792 18 20.7167 18 21C18 21.2833 17.9042 21.5208 17.7125 21.7125C17.5208 21.9042 17.2833 22 17 22H4Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Photos & videos</span>
                        </button>
                    </li>

                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" color='#ff2e74' height="24" width="24" preserveAspectRatio="xMidYMid meet" class="x1cbnkk4" fill="none"><title>camera-filled-refreshed</title><path d="M12 17.5C13.25 17.5 14.3125 17.0625 15.1875 16.1875C16.0625 15.3125 16.5 14.25 16.5 13C16.5 11.75 16.0625 10.6875 15.1875 9.8125C14.3125 8.9375 13.25 8.5 12 8.5C10.75 8.5 9.6875 8.9375 8.8125 9.8125C7.9375 10.6875 7.5 11.75 7.5 13C7.5 14.25 7.9375 15.3125 8.8125 16.1875C9.6875 17.0625 10.75 17.5 12 17.5ZM12 15.5C11.3 15.5 10.7083 15.2583 10.225 14.775C9.74167 14.2917 9.5 13.7 9.5 13C9.5 12.3 9.74167 11.7083 10.225 11.225C10.7083 10.7417 11.3 10.5 12 10.5C12.7 10.5 13.2917 10.7417 13.775 11.225C14.2583 11.7083 14.5 12.3 14.5 13C14.5 13.7 14.2583 14.2917 13.775 14.775C13.2917 15.2583 12.7 15.5 12 15.5ZM4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V7C2 6.45 2.19583 5.97917 2.5875 5.5875C2.97917 5.19583 3.45 5 4 5H7.15L8.4 3.65C8.58333 3.45 8.80417 3.29167 9.0625 3.175C9.32083 3.05833 9.59167 3 9.875 3H14.125C14.4083 3 14.6792 3.05833 14.9375 3.175C15.1958 3.29167 15.4167 3.45 15.6 3.65L16.85 5H20C20.55 5 21.0208 5.19583 21.4125 5.5875C21.8042 5.97917 22 6.45 22 7V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Camera</span>
                        </button>
                    </li>

                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg height="24" color='#fa6533' width="24" preserveAspectRatio="xMidYMid meet" class="x10wjepd" fill="none"><title>ic-headphones-filled</title><path fill="currentColor" d="M7 21H5c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41v-7c0-1.25.24-2.42.71-3.51A9.15 9.15 0 0 1 8.5 3.7 8.7 8.7 0 0 1 12 3a8.7 8.7 0 0 1 3.51.71A9.15 9.15 0 0 1 20.3 8.5 8.7 8.7 0 0 1 21 12v7c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59h-2c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41v-4c0-.55.2-1.02.59-1.41.39-.4.86-.59 1.41-.59h2v-1c0-1.95-.68-3.6-2.04-4.96A6.75 6.75 0 0 0 12 5c-1.95 0-3.6.68-4.96 2.04A6.75 6.75 0 0 0 5 12v1h2c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v4c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59Z"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Audio</span>
                        </button>
                    </li>

                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" color="#009de2" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="x19hyexh" fill="none"><title>person-filled-refreshed</title><path d="M12 11C10.7625 11 9.70312 10.5594 8.82188 9.67813C7.94063 8.79688 7.5 7.7375 7.5 6.5C7.5 5.2625 7.94063 4.20312 8.82188 3.32188C9.70312 2.44063 10.7625 2 12 2C13.2375 2 14.2969 2.44063 15.1781 3.32188C16.0594 4.20312 16.5 5.2625 16.5 6.5C16.5 7.7375 16.0594 8.79688 15.1781 9.67813C14.2969 10.5594 13.2375 11 12 11ZM5.25 21C4.63125 21 4.10156 20.7797 3.66094 20.3391C3.22031 19.8984 3 19.3687 3 18.75V17.85C3 17.2125 3.16406 16.6266 3.49219 16.0922C3.82031 15.5578 4.25625 15.15 4.8 14.8688C5.9625 14.2875 7.14375 13.8516 8.34375 13.5609C9.54375 13.2703 10.7625 13.125 12 13.125C13.2375 13.125 14.4563 13.2703 15.6562 13.5609C16.8562 13.8516 18.0375 14.2875 19.2 14.8688C19.7438 15.15 20.1797 15.5578 20.5078 16.0922C20.8359 16.6266 21 17.2125 21 17.85V18.75C21 19.3687 20.7797 19.8984 20.3391 20.3391C19.8984 20.7797 19.3687 21 18.75 21H5.25Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Contact</span>
                        </button>
                    </li>

                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" color='#ffb938' height="24" width="24" preserveAspectRatio="xMidYMid meet" class="xxeg2eo" fill="none"><title>poll-refreshed</title><path d="M4 18C4 17.45 4.19583 16.9792 4.5875 16.5875C4.97917 16.1958 5.45 16 6 16H10C10.55 16 11.0208 16.1958 11.4125 16.5875C11.8042 16.9792 12 17.45 12 18C12 18.55 11.8042 19.0208 11.4125 19.4125C11.0208 19.8042 10.55 20 10 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18ZM4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10H18C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14H6C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12ZM4 6C4 5.45 4.19583 4.97917 4.5875 4.5875C4.97917 4.19583 5.45 4 6 4L14 4C14.55 4 15.0208 4.19583 15.4125 4.5875C15.8042 4.97917 16 5.45 16 6C16 6.55 15.8042 7.02083 15.4125 7.4125C15.0208 7.80417 14.55 8 14 8H6C5.45 8 4.97917 7.80417 4.5875 7.4125C4.19583 7.02083 4 6.55 4 6Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Poll</span>
                        </button>
                    </li>

                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" color='#ff2e74' height="24" width="24" preserveAspectRatio="xMidYMid meet" class="xvzgjlx" fill="none"><title>calendar-filled-refreshed</title><path d="M14.5 18C13.8 18 13.2083 17.7583 12.725 17.275C12.2417 16.7917 12 16.2 12 15.5C12 14.8 12.2417 14.2083 12.725 13.725C13.2083 13.2417 13.8 13 14.5 13C15.2 13 15.7917 13.2417 16.275 13.725C16.7583 14.2083 17 14.8 17 15.5C17 16.2 16.7583 16.7917 16.275 17.275C15.7917 17.7583 15.2 18 14.5 18ZM5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V3C6 2.71667 6.09583 2.47917 6.2875 2.2875C6.47917 2.09583 6.71667 2 7 2C7.28333 2 7.52083 2.09583 7.7125 2.2875C7.90417 2.47917 8 2.71667 8 3V4H16V3C16 2.71667 16.0958 2.47917 16.2875 2.2875C16.4792 2.09583 16.7167 2 17 2C17.2833 2 17.5208 2.09583 17.7125 2.2875C17.9042 2.47917 18 2.71667 18 3V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Event</span>
                        </button>
                    </li>

                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" color='#06cf9c' height="24" width="24" preserveAspectRatio="xMidYMid meet" class="x1w53qhl" fill="none"><title>sticker-create-filled-refreshed</title><path opacity="0.9" fill-rule="evenodd" clip-rule="evenodd" d="M14 21.6814C15.0541 21.3509 16.024 20.7715 16.8221 19.9799L19.8489 16.9776C20.8807 15.9542 21.5742 14.6537 21.8569 13.25H18C15.7909 13.25 14 15.0409 14 17.25V21.6814ZM12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.25H18C14.6863 11.25 12 13.9363 12 17.25V22ZM9 5C8.44772 5 8 5.44772 8 6V8H6C5.44772 8 5 8.44772 5 9C5 9.55229 5.44772 10 6 10H8V12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12V10H12C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8H10V6C10 5.44772 9.55228 5 9 5Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">New sticker</span>
                        </button>
                    </li>
                    <hr className="text-neutral-light5 my-1" />

                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                                <svg viewBox="0 0 24 24" color='#3a5564' height="24" width="24" preserveAspectRatio="xMidYMid meet" class="x1bzzifw" fill="none"><title>storefront-filled</title><path d="M4.0002 3H20.0002C20.2835 3 20.521 3.09583 20.7127 3.2875C20.9044 3.47917 21.0002 3.71667 21.0002 4C21.0002 4.28333 20.9044 4.52083 20.7127 4.7125C20.521 4.90417 20.2835 5 20.0002 5H4.0002C3.71686 5 3.47936 4.90417 3.2877 4.7125C3.09603 4.52083 3.0002 4.28333 3.0002 4C3.0002 3.71667 3.09603 3.47917 3.2877 3.2875C3.47936 3.09583 3.71686 3 4.0002 3ZM4.0002 21C3.71686 21 3.47936 20.9042 3.2877 20.7125C3.09603 20.5208 3.0002 20.2833 3.0002 20V14H2.8252C2.50853 14 2.2502 13.8792 2.0502 13.6375C1.8502 13.3958 1.78353 13.1167 1.8502 12.8L2.8502 6.8C2.9002 6.56667 3.01686 6.375 3.2002 6.225C3.38353 6.075 3.59186 6 3.8252 6H20.1752C20.4085 6 20.6169 6.075 20.8002 6.225C20.9835 6.375 21.1002 6.56667 21.1502 6.8L22.1502 12.8C22.2169 13.1167 22.1502 13.3958 21.9502 13.6375C21.7502 13.8792 21.4919 14 21.1752 14H21.0002V20C21.0002 20.2833 20.9044 20.5208 20.7127 20.7125C20.521 20.9042 20.2835 21 20.0002 21C19.7169 21 19.4794 20.9042 19.2877 20.7125C19.096 20.5208 19.0002 20.2833 19.0002 20V14H15.0002V20C15.0002 20.2833 14.9044 20.5208 14.7127 20.7125C14.521 20.9042 14.2835 21 14.0002 21H4.0002ZM5.0002 19H13.0002V14H5.0002V19Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Catalog</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex gap-2 items-center p-2 cursor-pointer hover:bg-neutral-light5 w-full rounded-lg">
                            <span>
                            <svg viewBox="0 0 24 24" height="24" color='#ffbc38' width="24" preserveAspectRatio="xMidYMid meet" class="x1ev1nr0" fill="none"><title>bolt-filled</title><path d="M8.99997 15H5.89997C5.49997 15 5.20414 14.8209 5.01247 14.4625C4.8208 14.1042 4.84164 13.7584 5.07497 13.425L12.55 2.67503C12.7166 2.44169 12.9333 2.27919 13.2 2.18753C13.4666 2.09586 13.7416 2.10003 14.025 2.20003C14.3083 2.30003 14.5166 2.47503 14.65 2.72503C14.7833 2.97503 14.8333 3.24169 14.8 3.52503L14 10H17.875C18.3083 10 18.6125 10.1917 18.7875 10.575C18.9625 10.9584 18.9083 11.3167 18.625 11.65L10.4 21.5C10.2166 21.7167 9.99164 21.8584 9.72497 21.925C9.4583 21.9917 9.19997 21.9667 8.94997 21.85C8.69997 21.7334 8.50414 21.5542 8.36247 21.3125C8.2208 21.0709 8.16664 20.8084 8.19997 20.525L8.99997 15Z" fill="currentColor"></path></svg>
                            </span>
                            <span className="text-15 text-black-99 font-medium">Quick replies</span>
                        </button>
                    </li>
                </ul>
                <input type='file' ref={fileInputRef} onChange={HandleFileUploaded} className='hidden' accept='image/*,video/*,.pdf,.docs'/>
            </motion.div>
        </AnimatePresence>

        // <div id="upload-overlay" className="fixed w-full h-full bg-white z-18 top-16 border-1 border-neutral-light4  left-157.5">
        //     <section className="grid grid-rows-[1fr_98px]">
        //         <section className="grid grid-rows-[72px_1fr_72px]">
        //             <div>
                        
        //             </div>
        //             <div></div>
        //             <div></div>
        //         </section>
        //         <section></section>
        //     </section>
        // </div>
    )
};

export default UploadPopup;

