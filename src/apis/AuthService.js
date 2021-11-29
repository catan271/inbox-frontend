import BaseService from "./BaseService";

class AuthService extends BaseService{
    constructor() {
        super({ subURL: '/users'})
    }

    login = (body = {}) => {
        return this.post('login', body)
    }

    register = (body = {}) => {
        return this.post('register', body)
    }

    logout = () => {
        return this.get('logout')
    }
}

export default new AuthService()