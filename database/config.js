const mongoose = require("mongoose");
    mongoose.set('strictQuery', false);
const options = {

    // Establecer la zona horaria
    driverOptions: { tzOffset: '-05:00' }
};

const MongoConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log("usuario conectado");
    } catch (error) {
        throw new Error("No se pudo conectar a la base de datos");
    }
};
module.exports = {
    MongoConfig,
};
