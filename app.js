const express = require('express');
const cors = require('cors');
const userRouters = require('./server/router/userRouter');
const noteRouters = require('./server/router/noteRouter');
const error = require('./server/middleware/errorHandler');
const session = require('./server/middleware/sessionConfig');
const { auth } = require('./server/middleware/decodedJWT');

// const { join } = require('path');

// const https = require('https');
// const fs = require('fs');

// const privateKey = fs.readFileSync('./private.key');
// const certificate = fs.readFileSync('./certificate.crt');
const app = express();


// app.use('/css', express.static(join(__dirname, 'src/css')))
// app.use('/js', express.static(join(__dirname, 'src/js')))
// app.use('/storage', express.static(join(__dirname, 'src/storage')))

app.use(cors({
    origin: 'https://cris-fr.github.io', // Agrega localhost si es necesario
    credentials: true
  }));
  app.use(session);
  app.use(express.json());
app.use(error.jsonParseErrorHandler);



app.use("/users", (req, res, next) => {
    req.__dirname = __dirname;
    next()
}, userRouters);
app.use("/notes", (req, res, next) => {
    req.__dirname = __dirname;
    next()
}, auth, noteRouters);





// const httpsServer = https.createServer({
//     key: privateKey,
//     cert: certificate
// }, app);

const config = {
    host: process.env.EXPRESS_HOST,
    port: process.env.EXPRESS_PORT,
}
app.listen(config, () => {
    console.log(`http://${config.host}:${config.port}/users`);
});
// httpsServer.listen(3000, () => {
//     console.log('https://localhost:3000/users');
// });
