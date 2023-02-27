const { Schema, model } = require('mongoose');

const DetallePedidoSchema = Schema({
    pedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        default: ''
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
    },
    color: {
        type: String,
        default: 'SinColor'
    },
    talla: {
        type: String,
        default: 'M',
        required: true
    },
    precio: {
        type: Number,
        default: 1,
        required: true
    },
    cantidad: {
        type: Number,
        default: 1,
        required: true
    },
    subtotal: {
        type: Number,
        default: 0,
        required: true
    },
    fecha: {
        type: Date
    },
    usuario: {
        type: String,
        default: ''
    }
});


DetallePedidoSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id
    return data;
}


module.exports = model('DetallePedido', DetallePedidoSchema);
