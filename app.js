const express = require('express');
const https = require('https');
const fs = require('fs');


const error = require('./server/middleware/errorHandler');


const privateKey = fs.readFileSync('./private.key');
const certificate = fs.readFileSync('./certificate.crt');
const app = express();


app.use(express.json());
app.use(error.jsonParseErrorHandler);

app.use()

app.get('/', (req, res) => {
    res.send('Ok')
})

const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
}, app);

const config = {
    host: process.env.EXPRESS_HOST,
    port: process.env.EXPRESS_PORT,
}

httpsServer.listen(3000, () => {
    console.log('https://localhost:3000');
});
