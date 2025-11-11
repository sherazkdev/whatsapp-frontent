import React,{useState} from 'react';

// Icons 
import {SearchRefreshed} from "../../../../assets/Icons"

// Components
import Search from './Components/Search';
import Chat from "./Components/Chat";
import Links from "./Components/Links";

const ChatList = () => {

    // States
    const [errors,setError] = useState([]);

    // Error Handling
    if(errors?.length > 0){
        return (<>Some thing wrong</>);
    }
    
    return (
        <section id='chats-messages-section' className='w-full flex flex-col p-[10px_!important] gap-2'>
            <Search />
            <Links />
            <Chat  />
        </section>
    )
}

export default ChatList;