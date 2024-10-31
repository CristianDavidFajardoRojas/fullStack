const session = require('express-session');
const fs = require('fs');

// const SECRET_KEY =  'tu_clave_secreta_aqui'

module.exports = session({
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // Asegúrate de usar 'true' si estás en HTTPS
        maxAge: 1800000
    }
})