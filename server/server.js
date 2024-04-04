const https = require('https');
const fs = require('fs');
const app = require('./app.js');

const PORT = process.env.PORT || 5000;

const sslConfig = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    passphrase: process.env.SSL_PASSPHRASE
};

const server = https.createServer(sslConfig, app);

function startServer() {
    server.listen(PORT, () => {
        console.log(`<< Server running @PORT:${PORT} ================ >>`);
    });
}

module.exports = {
    start: startServer
};
