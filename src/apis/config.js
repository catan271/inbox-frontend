const env = {
    dev: 1,
    prod: 2,
    alt: 3,
}

const endpointMapper = {
    [env.dev]: 'http://localhost:4000',
    [env.prod]: 'https://inbox-backend.herokuapp.com',
}

const socketEndpointMapper = {
    [env.dev]: 'http://localhost:4000',
    [env.prod]: 'wss://inbox-backend.herokuapp.com',
}

const currentEnv = env.prod
const endpoint = endpointMapper[currentEnv]
const socketEndpoint = socketEndpointMapper[currentEnv]
const timeout = 12000

export { endpoint, socketEndpoint, timeout }