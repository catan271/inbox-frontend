import dialogAction from "../constants/DialogActions"
import userAction from "../constants/UserActions"
import { dispatchDialogReference } from "./Dialog"
import { dispatchUserReference } from "./Provider"

export const setUser = (user) => {
    dispatchUserReference({
        type: userAction.SET,
        user
    })
}

export const setDialog = (component) => {
    dispatchDialogReference({
        type: dialogAction.SET,
        component
    })
}

export const removeDialog = () => {
    dispatchDialogReference({
        type: dialogAction.REMOVE
    })
}
