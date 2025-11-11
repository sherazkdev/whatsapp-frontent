import React, { useContext } from "react";

// Contexts
import {UIContext} from "../../context/UIContext";

// Components 
import Sidebar from "../../shared/Sidebar/Sidebar";

// Pages
import Chats from "../../app/Chats/Chats";
import Channel from "../../app/Channel/Channel";
import Profile from "../../app/Profile/Profile";
import Settings from "../../app/Settings/Settings";
import Status from "../../app/Status/Status";
import Auth from "../../app/Auth/Auth";
import Communities from "../../app/Communities/Communities";
import Tools from "../../app/Tools/Tools";

// App layout
const AppLayout = () => {

    // Page Context
    const {page} = useContext(UIContext);

    return (
        <>  
            <main className="grid grid-cols-[64px_566px_1fr] grid-rows-1 w-full overflow-hidden">
                    
                {/* Sidebar Links */}
                <Sidebar />

                {/* Page Window */}
                {page === "chats" && ( <Chats />)}
                {page === "status" && ( <Status />)}
                {page === "communities" && ( <Communities />)}
                {page === "setting" && ( <Settings />)}
                {page === "channel" && ( <Channel />)}
                {page === "profile" && ( <Profile />)}
                {page === "tools" && ( <Tools />)}

            </main>

        </>
    )

};

// Exporting
export default AppLayout;