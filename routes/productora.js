const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

//POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo','Inactivo']),
    check('slogan', 'El slogan es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),

], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaCreacion = new Date();
        productora.fechaActualizacion = new Date();

        productora = await productora.save();
        res.send(productora);


    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }


});

//GET
router.get('/', async function(req, res) {
    try {
        const productoras = await Productora.find();
        res.send(productoras);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }    
})

//UPDATE
router.put('/:productoraId', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo', 'Inactivo']),
    check('slogan', 'El slogan es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(400).send('Productora no encontrada');
        }

        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaActualizacion = new Date();

        productora = await productora.save();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

//DELETE
router.delete('/:productoraId', async function(req, res) {
    try {
        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(404).send('Productora no encontrado');
        }

        await Productora.findByIdAndDelete(req.params.productoraId);

        res.send({ message: 'Productora eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;