import userAction from "../constants/UserActions"

export const UserReducer = (state, action) => {
    switch (action.type) {
        case userAction.SET:
            return action.user
        default:
            return state
    }
}