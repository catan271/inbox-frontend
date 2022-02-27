import dialogAction from "../constants/DialogActions"
import userAction from "../constants/UserActions"

export const UserReducer = (state, action) => {
    switch (action.type) {
        case userAction.SET:
            return action.user
        default:
            return state
    }
}

export const DialogReducer = (state, action) => {
    switch (action.type) {
        case dialogAction.SET:
            return action.component
        case dialogAction.REMOVE:
            return undefined
        default: 
            return state;
    }
}