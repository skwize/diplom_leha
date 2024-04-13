import { createContext, useState, useCallback } from "react";

export const ShowAddUserModalContext = createContext();

export const ShowAddUserModalContextProvider = ({ children }) => {

    const [ShowAddUserModal, setShowAddUserModal] = useState(false);

    const ShowUserModal = useCallback(()=>{
        return setShowAddUserModal(true);
    }, [])

    const HideUserModal = useCallback(()=>{
        return setShowAddUserModal(false);
    }, [])

    return <ShowAddUserModalContext.Provider value={{
        ShowAddUserModal,
        ShowUserModal,
        HideUserModal
    }}>{ children }</ShowAddUserModalContext.Provider>
}