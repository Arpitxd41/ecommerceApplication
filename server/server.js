const http = require('http'); // Change to http
const app = require('./app.js');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app); // Change to http

function startServer() {
    server.listen(PORT, () => {
        console.log(`<< Server running @PORT:${PORT} ================ >>`);
    });
}

module.exports = {
    start: startServer
};
