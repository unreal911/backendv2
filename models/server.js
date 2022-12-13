const express = require('express');
const cors = require('cors');
const { MongoConfig } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT
        this.rutas = {
            usuario: `/api/usuario`,
            uploads: `/api/uploads`,
            auth: '/api/auth',
            categoria: '/api/categoria'
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
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.rutas.usuario, require('../routes/usuario'))
        this.app.use(this.rutas.uploads, require('../routes/subirArchivo'))
        this.app.use(this.rutas.auth, require('../routes/auth'))
        this.app.use(this.rutas.categoria, require('../routes/categoria'))
    }
    listen() {
        this.app.listen(this.PORT, () => { console.log(`estas en el puerto ${this.PORT}`) })
    }
}
module.exports = {
    Server
}