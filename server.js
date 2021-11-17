// ENV
require('dotenv').config();

// Modules
const http = require('http');

// Components
const app = require('./app');

// Create HTTP server with app component
const server = http.createServer(app);

// Listen to corresponding port
server.listen(process.env.PORT || 3000);