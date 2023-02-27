const { Schema, model, SchemaType } = require('mongoose');
const moment = require('moment-timezone');
const pedidoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    departamento: {
        type: String,
        required: true,
        default: ''
    },
    direccion: {
        type: String,
        default: '',
        required: true
    },
    fecha: {
        type: Date,
    },
    estado: {
        type: String,
        default: 'pendiente',
    },
    telefono: {
        type: String,
        default: '99999999',
    },
    TipoPago: {
        type: String,
        default: 'SoloPedido'
    },
    correo: {
        type: String,
        default: 'Sin correo'
    },
    pagado: {
        type: String,
        default: 'PorProcesar'
    },
    Total: {
        type: Number,
        default: 0//Hacer una funcion
    },
    tipoventa: {
        type: String,
        default: 'SinDefinir',
    },
    adicionnales: {
        type: String,
        default: ''
    },
    usuario: {
        type: String,
        default: ''
    }
});


pedidoSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id
    return data;
}

module.exports = model('Pedido', pedidoSchema);
