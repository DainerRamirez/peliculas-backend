const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    slogan: { type: String, required: false },
    descripcion: { type: String, required: true },
    fechaCreacion: { type: Date, required: true},
    fechaActualizacion: { type: Date, required: true}

});

module.exports = model('Productora', ProductoraSchema);