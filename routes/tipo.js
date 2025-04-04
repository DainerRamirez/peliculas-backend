const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

//POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();
        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }


});

//GET
router.get('/', async function(req, res) {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }    
})

//UPDATE
router.put('/:tipoId', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(400).send('Tipo no encontrado');
        }

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// DELETE
router.delete('/:tipoId', async function(req, res) {
    try {
        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }

        await Tipo.findByIdAndDelete(req.params.tipoId);

        res.send({ message: 'Tipo eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;