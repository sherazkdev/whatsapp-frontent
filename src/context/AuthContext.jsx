import { createContext, use, useContext, useEffect, useState } from "react";
import { UIContext } from "./UIContext";
import Auth from "../app/Auth/Auth";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    // States
    const [error,setError] = useState(null);
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(null);

    // Context
    const {setPage,page} = useContext(UIContext);

    // Hook required for Auth
    const {FindUserError,FindUserLoading,FindedUser} = useAuth();

    // For error handling and set user
    useEffect( () => {
        if(FindUserError !== null){
            console.log(FindUserError)
            setError(FindUserError);
        }
    },[FindUserError]);

    // These useEffect For Loading
    useEffect( () => {
        if(FindUserLoading){
            setLoading(FindUserLoading);
        }
    },[FindUserLoading])

    useEffect(() => {
        if (FindedUser) {
          setUser(FindedUser);
        }
    }, [FindedUser]);

    // Check Error For example Error is Auth required
    if(error){
        if(error.statusCode === 401 && error.message === "Unauthorized Request"){
            // setPage("authRequired");
            return <Auth />
        }
        return;
    }
    
    if(user){
        // Asing the user
        return (
            <AuthContext.Provider value={{user,setUser}}>
                {children}
            </AuthContext.Provider>
        )
    }

};