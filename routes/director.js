const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

//POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo','Inactivo']),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date();
        director.fechaActualizacion = new Date();

        director = await director.save();
        res.send(director);


    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }


});


//GET
router.get('/', async function(req, res) {
    try {
        const directores = await Director.find();
        res.send(directores);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }    
})


//UPDATE
router.put('/:directorId', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo','Inactivo']),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let director = await Director.findById(req.params.directorId);
        if (!director) {
            return res.status(400).send('Director no encontrado');
        }

        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date();

        director = await director.save();
        res.send(director);


    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }


});

module.exports = router;