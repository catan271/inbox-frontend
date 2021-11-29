import axios from 'axios'
import localStorageKey from '../constants/LocalStorageKeys'

import { endpoint, timeout } from  './config'

class BaseService {
    constructor(config) {
        let baseURL = config.baseURL || endpoint
        if (config.subURL) baseURL += config.subURL
        this.api = axios.create({
            baseURL,
            timeout
        })

        this.api.interceptors.request.use(
            (config) => {
                const token = window.localStorage.getItem(localStorageKey.TOKEN)
                if (token) {
                    config.headers.Authorization = token
                }
                return config
            },
            (err) => {
                return Promise.reject(err);
            }
        )
    }

    request = (config) => {
        return this.api.request(config)
    }

    get = (url = '', config = {}) => {
        return this.api.get(url, config)
    }

    post = (url = '', body = {}, config = {}) => {
        return this.api.post(url, body, config)
    }

    delete = (url = '', body = {}, config = {}) => {
        return this.api.delete(url, body, config)
    }

    patch = (url = '', body = {}, config = {}) => {
        return this.api.patch(url, body, config)
    }
}

export default BaseService