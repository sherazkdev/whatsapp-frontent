import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";


// Context
export const SocketContext = createContext();


export const SocketProvider = ({children}) => {

    /** oldest code 
        Reference
        const socketRef = useRef(null);

        const SOCKET_URL = import.meta.env.VITE_API_URL;

        // const socket  = useMemo( () => io(SOCKET_URL,{autoConnect:true,withCredentials:true}),[SOCKET_URL]);
        if(!socketRef.current){
            socketRef.current = io(SOCKET_URL,{autoConnect:true,withCredentials:true});
        }
        useEffect( () => {
            const socket = socketRef.current;
            
            // Events
            socket.on("event:disconnected",(info) => console.log(info))

            // Clean up functions
            return () => socket.disconnect();
        },[])

        return (
            <SocketContext.Provider value={{socket:socketRef.current}}>
                {children}
            </SocketContext.Provider>
        )
    **/

    // Reference
    const socketRef = useRef(null);
    const SOCKET_URL = import.meta.env.VITE_API_URL;
    const [isConnected,setIsConnected] = useState(false);

    /**
     * 1: This useMemo using for Socket io connection 
    */
    // const socket = useMemo( () => {
    //     // Inialized connection
    //     socketRef.current = io(SOCKET_URL,{autoConnect:true,withCredentials:true});
    // },[SOCKET_URL])
    
    /**
     * 1: This useEffect using for Socket io close connection and clean up functions
    */
    useEffect( () => {
        // Inialized connection
        socketRef.current = io(SOCKET_URL,{autoConnect:true,withCredentials:true});

        const socket = socketRef.current;

        socket.on("connect",() => { setIsConnected(true); console.log(`Success: User at conneted at this id ${socket.id}`);});
        

        // Clean up fuctions
        return () => socket.disconnect();

    },[SOCKET_URL])

    return (
        <SocketContext.Provider value={{socket:(isConnected === true && socketRef.current)}}>
            {children}
        </SocketContext.Provider>
    )

};