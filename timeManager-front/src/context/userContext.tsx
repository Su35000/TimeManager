import React, {createContext, Dispatch, useContext, useReducer} from "react";
import {
    UserReducer,
    IAuthState,
    initialUserState,
} from "../reducers/UserReducer";

const UserStateContext = createContext<IAuthState>(initialUserState);
const UserDispatchContext = createContext<Dispatch<any> | null>(null);

export const UserProvider = ({children}: React.PropsWithChildren) => {
    // @ts-ignore
    const [user, dispatch] = useReducer(UserReducer, initialUserState)

    return (
        <UserStateContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
};

export function useUserState() {
    const context = useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState mustt be used within a UserProvider");
    }
    return context;
}

export function useUserDispatch() {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserState mustt be used within a UserProvider");
    }
    return context;
}
