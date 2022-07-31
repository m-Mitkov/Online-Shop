const config = {
    development: {
        PORT: 3333,
        DB_CONNECTION: 'mongodb://localhost/online-shop',
        SECRET: 'formZeroToHero',
        AUTH_COOKIE_JWT: 'x-auth-token',
        USER_CREDENTIALS: 'user-credentials',
        SALT_ROUNDS: 7
    },
    production: {

    }
}
module.exports = config[process.env.NODE_ENV.trim()];