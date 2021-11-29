import BaseService from "./BaseService";

class UserService extends BaseService {
    constructor() {
        super({
            subURL: '/users'
        })
    }

    getProfile() {
        return this.get('me')
    }

    find(search) {
        return this.get('find', {params: {search}})
    }
}

export default new UserService()