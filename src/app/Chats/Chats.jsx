import React, { useContext, useState } from 'react';

// Components
import ChatListTopHeader from "./components/ChatListTopHeader/ChatListTopHeader";
import ChatList from "./Components/ChatList/ChatList";
import ChatWindow from './ChatWindow/chatWindow';

const Chats = () => {
    
    // eslint-disable-next-line
    const [errors,setError] = useState([]);

    // Error Handling
    if(errors?.length > 0){
        return (<>Some thing wrong</>);
    }


    return (
        <>
            <section className='grid grid-cols-1 grid-rows-[64px_1fr] border border-neutral-light4 overflow-hidden'>
                <ChatListTopHeader />
                <ChatList />
            </section>
            
            <ChatWindow />
        </>
    );
}

export default Chats;
