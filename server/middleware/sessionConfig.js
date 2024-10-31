const session = require('express-session');
const fs = require('fs');

// const SECRET_KEY =  'tu_clave_secreta_aqui'

module.exports = session({
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1800000 },
})