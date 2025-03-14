const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo','Inactivo']),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();
        
        genero = await genero.save();
        res.send(genero);


    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }


});

router.get('/', async function(req, res) {
    try {
        const generos = await Genero.find();
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }    
})

module.exports = router;
