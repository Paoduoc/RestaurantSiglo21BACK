const { Schema, model } = require('mongoose');

const productosBodega = Schema({
    id: {
        type: String
    },
    nombreProducto: {
        type: String
    },
    estado: {
        type: Boolean
    },
    gramos: {
        type: Array
    },
    cantidadMin: {
        type: Number
    }
})

const bodegaSchema = Schema({
    productosBodega: [] 
});

module.exports = model( 'Bodega', bodegaSchema );