const session = require('express-session');
const fs = require('fs');

const SECRET_KEY =  'tu_clave_secreta_aqui'

module.exports = session({
    secret: SECRET_KEY.toString('utf8'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 1800000 },
})

