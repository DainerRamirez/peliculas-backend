const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

//POST
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

//GET
router.get('/', async function(req, res) {
    try {
        const generos = await Genero.find();
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }    
})

//UPDATE
router.put('/:generoId', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo','Inactivo']),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoId);
        if (!genero) {
            return res.status(400).send('Género no encontrado');
        }

        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaActualizacion = new Date();

        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// DELETE
router.delete('/:generoId', async function(req, res) {
    try {
        // Verifica si el género existe
        let genero = await Genero.findById(req.params.generoId);
        if (!genero) {
            return res.status(404).send('Género no encontrado');
        }

        // Elimina el género
        await Genero.findByIdAndDelete(req.params.generoId);

        // Responde con un mensaje de éxito
        res.send({ message: 'Género eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
