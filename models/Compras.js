const mongoose = require('mongoose');

const CompraSch = mongoose.Schema({
    nombreComprador:{
        type: String,
        required: true
    },
    numeroProductos:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    medioDPago:{
        type: String,
        required: true
    },
    nombreTienda:{
        type: String,
        required: true
    },
    fecha:{
        type: String,
        required: true    
    }
},{ versionkey: false});

module.exports = mongoose.model('Compra', CompraSch);