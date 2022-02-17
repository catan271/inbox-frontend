import io from 'socket.io-client'

import { socketEndpoint } from '../../../apis/config'
import { pushChat } from '../Main/Contacts/ContactList'
import { pushMessage } from '../Main/Inbox/Inbox'
import { data } from '../Main/Main'

const socket = io(socketEndpoint, {transports: ['websocket']})

socket.on('newMessage', ({ content, from }) => {
    const time = new Date()
    if (data[from._id]) {
        data[from._id].messages = [
            {
                from: from._id,
                content,
                time
            },
            ...data[from._id].messages
        ]
        pushMessage(from._id)
    }
    pushChat({ 
        other: from,
        chat: {
            last: {
                from: from._id,
                content,
                time
            },
            seen: false
        }
    })
})

export default socket