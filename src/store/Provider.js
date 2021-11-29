import React, { useReducer } from 'react'

import { UserReducer } from './Reducers'

export const UserContext = React.createContext()
export let dispatchUserReference

export default function Provider({ children }) {
    const [user, dispatchUser] = useReducer(UserReducer, {})
    dispatchUserReference = dispatchUser

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}