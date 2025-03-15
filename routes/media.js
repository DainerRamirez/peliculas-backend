const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

//POST
router.post('/', [
    check('serial', 'El serial es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('sinopsis', 'La sinopsis es obligatorio').not().isEmpty(),
    check('urel', 'El urel es obligatorio').not().isEmpty(),
    check('imagenPortada', 'La imagen de portada es obligatorio').not().isEmpty(),
    check('añoEstreno', 'El año de estreno es obligatorio').not().isEmpty(),
    check('genero', 'El genero es obligatorio').not().isEmpty(),
    check('director', 'El director es obligatorio').not().isEmpty(),
    check('productora', 'La productora es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),


], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
        if (existeMediaPorSerial) {
            return res.status(400).send('Existe serial');
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urel = req.body.url;
        media.imagenPortada = req.body.imagenPortada;
        media.añoEstreno = req.body.añoEstreno;
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.send(media);


    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }


});

//GET
router.get('/', async function(req, res) {
    try {
        const medias = await Media.find().populate([
            { path: 'genero', select: 'estado' },
            { path: 'director', select: 'estado' },
            { path: 'productora', select: 'estado' },
            { path: 'tipo', select: 'nombre' }
        ]);
        res.send(medias);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

//UPDATE



module.exports = router;