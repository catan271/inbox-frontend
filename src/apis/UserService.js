import BaseService from "./BaseService";

class UserService extends BaseService {
    constructor() {
        super({
            subURL: '/user'
        })
    }

    getProfile() {
        return this.get('me')
    }

    find(search) {
        return this.get('find', {params: {search}})
    }

    update(body) {
        return this.patch('update', body)
    }
}

export default new UserService()