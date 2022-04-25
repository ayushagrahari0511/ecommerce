const express = require('express')
const mongoose = require('mongoose')
const next = require('next');
const path = require('path');
const url = require('url');
const DbConnect = require('./app/database')
const router = require('./app/routes')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    if (!dev) {
        server.use(function (req, res, next) {
            var proto = req.headers["x-forwarded-proto"];
            if (proto === "https") {
                res.set({
                    'Strict-Transport-Security': 'max-age=31557600' // one-year
                });
                return next();
            }
            res.redirect("https://" + req.headers.host + req.url);
        });
    }

    // Static file serving

    server.use('/static', express.static(path.join(__dirname, 'static'), {
        maxAge: dev ? '0' : '365d'
    }));

    // Connecting to database
    DbConnect();

    // Registering Routing
    server.use(express.json())
    server.use("/api", router)
    server.all('*', (req, res) => {
        return handler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})