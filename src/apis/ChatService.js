import BaseService from "./BaseService";

class ChatService extends BaseService {
    constructor() {
        super({
            subURL: '/chats'
        })
    }

    getAllChat = () => {
        return this.get('all')
    }

    getChat = (id, skip) => {
        return this.get(id, {params: {skip}})
    }

    send = (body) => {
        return this.post('send', body)
    }
}

export default new ChatService()