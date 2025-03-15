const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const MultimediaSchema = Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true, },
    url: { type: String, required: true, unique: true },
    imagenPortada: { type: String, required: true},
    añoEstreno: { type: Number, required: true},
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
    fechaCreacion: { type: Date, required: true},
    fechaActualizacion: { type: Date, required: true}

});

module.exports = model('Multimedia', MultimediaSchema);