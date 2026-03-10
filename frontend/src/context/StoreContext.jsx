import { createContext, useEffect, useState} from "react";
import axios from "axios";

export const StoreContext  = createContext(null)

const StoreContextProvider = (props) =>{

    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [name, setName] = useState("");


    const contextValue = {
        url,
        token,
        setToken,
        name,
        setName
    }

    useEffect(()=>{
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setName(localStorage.getItem("name"));
            console.log("UserId from LocalStorage:", localStorage.getItem("userId"));
        }
    },[])

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;