const session = require('express-session');
const fs = require('fs');

// const SECRET_KEY =  'tu_clave_secreta_aqui'

module.exports = session({
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, // Asegúrate de usar 'true' si estás en HTTPS
        sameSite: 'None',
        maxAge: 1800000,
        domain: '.github.io', // Permitir que la cookie se comparta en todos los subdominios
    },
})