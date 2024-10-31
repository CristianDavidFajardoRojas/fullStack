const session = require('express-session');
const fs = require('fs');

// const SECRET_KEY =  'tu_clave_secreta_aqui'

module.exports = session({
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: false,
    saveUninitialized: false, // Solo guarda sesiones inicializadas
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Usa true en producción
      httpOnly: true, // No accesible desde JavaScript
      sameSite: 'Strict', // Cambia a 'Lax' si tienes problemas
      maxAge: 1800000 // Duración de la cookie
    }
  })



