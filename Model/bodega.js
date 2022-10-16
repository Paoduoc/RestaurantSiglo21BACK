const { Schema, model } = require('mongoose');

const bodegaSchema = Schema({

    /* productos: {
        type: Array
    } */
    //con helpers se pueden controlar que sea unico y que sea requerido
    nombreProducto: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    gramosDispo:{
        type: Number
    },
    gramosMin: {
        type: Number
    }
});

module.exports = model( 'Bodega', bodegaSchema );