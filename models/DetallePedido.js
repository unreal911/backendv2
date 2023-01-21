const { Schema, model } = require('mongoose');

const DetallePedidoSchema = Schema({
    pedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true,
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
    },
    talla:{
        type:String,
        default:'M',
        required:true
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
    }
});


DetallePedidoSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id
    return data;
}


module.exports = model('DetallePedido', DetallePedidoSchema);
