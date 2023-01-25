const { Schema, model } = require('mongoose');

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
        default: new Date()
    },
    estado: {
        type: String,
        default: 'Pendiente',
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
        type: Boolean,
        default: false
    },
    Total: {
        type: Number,
        default: 0
    },
    tipoventa:{
        type:String,
        default:'SinDefinir',
    },
    adicionnales: {
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
