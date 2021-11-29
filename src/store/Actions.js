import userAction from "../constants/UserActions"
import { dispatchUserReference } from "./Provider"

export const setUser = (user) => {
    dispatchUserReference({
        type: userAction.SET,
        user
    })
}
