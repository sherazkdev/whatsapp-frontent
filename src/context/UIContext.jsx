import { createContext,useState } from "react";


export const UIContext = createContext();

export const UIProvider = ({children }) => {
    /** States variables */
    const [page,setPage] = useState("chats");
    const [uploadFile,setUploadFile] = useState(null);

    // Page Update
    const HandleSetPage = (pageRef) => setPage(pageRef);

    return (
        <UIContext.Provider value={{page,setPage,HandleSetPage,uploadFile,setUploadFile}}>
            {children}
        </UIContext.Provider>
    )

};