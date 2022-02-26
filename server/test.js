const express = require('express');
const cors = require("cors");

function startExpressServer() {
    const app = express();
    app.use(cors());
    console.log('started server');

    app.get('/test123', (req, res) => {
        res.send('test123');
    });

    app.listen(8001);
}

module.exports.startExpressServer = startExpressServer;