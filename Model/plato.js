const { Schema, model } = require('mongoose');

const platoSchema = Schema({
    nombre: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    ingredientes: {
        type: Schema.ObjectId,
        ref: 'BodegaCocina'
    },
    preparacion: {
        type: String
    },
    tiempoPreparacion: {
        type: String
    },
    precio: {
        type: String
    }
});

module.exports = model( 'Plato', platoSchema );