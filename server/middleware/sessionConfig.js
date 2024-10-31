const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const redisClient = redis.createClient();

// const SECRET_KEY =  'tu_clave_secreta_aqui'

module.exports = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // Asegúrate de usar 'true' si estás en HTTPS
        maxAge: 1800000
    }
})