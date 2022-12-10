const express = require('express');
const cors = require('cors');
const { MongoConfig } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT
        this.rutas = {
            usuario: `/api/usuario`
        }
        this.mongooseConfig()
        this.middlewares()
        this.routes()

    }
    async mongooseConfig() {
        await MongoConfig()
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.use(this.rutas.usuario, require('../routes/usuario'))
    }
    listen() {
        this.app.listen(this.PORT, () => { console.log(`estas en el puerto ${this.PORT}`) })
    }
}
module.exports = {
    Server
}