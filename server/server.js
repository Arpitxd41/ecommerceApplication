const http = require('http');
const app = require('./app.js');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

function startServer() {
    server.listen(PORT, () => {
        console.log(`<< Server running @PORT:${PORT} ================ >>`);
    });
}

module.exports = {
    start: startServer
};
