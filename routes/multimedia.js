const { Router } = require('express');
const Multimedia = require('../models/Multimedia');
const { validationResult, check } = require('express-validator');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const router = Router();

//POST
router.post('/', [
    check('serial', 'El serial es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('sinopsis', 'La sinopsis es obligatorio').not().isEmpty(),
    check('url', 'El url es obligatorio').not().isEmpty(),
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

        const existeMultimediaPorSerial = await Multimedia.findOne({ serial: req.body.serial });
        if (existeMultimediaPorSerial) {
            return res.status(400).send('Existe serial');
        }

        // Verificar que el género, director, productora y tipo estén activos
        const genero = await Genero.findById(req.body.genero);
        if (!genero || genero.estado !== 'Activo') {
            return res.status(400).send('El género no está activo o no existe');
        }

        const director = await Director.findById(req.body.director);
        if (!director || director.estado !== 'Activo') {
            return res.status(400).send('El director no está activo o no existe');
        }

        const productora = await Productora.findById(req.body.productora);
        if (!productora || productora.estado !== 'Activo') {
            return res.status(400).send('La productora no está activa o no existe');
        }

        const tipo = await Tipo.findById(req.body.tipo);
        if (!tipo) {
            return res.status(400).send('El tipo no existe');
        }

        let multimedia = new Multimedia();
        multimedia.serial = req.body.serial;
        multimedia.titulo = req.body.titulo;
        multimedia.sinopsis = req.body.sinopsis;
        multimedia.url = req.body.url;
        multimedia.imagenPortada = req.body.imagenPortada;
        multimedia.añoEstreno = req.body.añoEstreno;
        multimedia.genero = req.body.genero._id;
        multimedia.director = req.body.director._id;
        multimedia.productora = req.body.productora._id;
        multimedia.tipo = req.body.tipo._id;
        multimedia.fechaCreacion = new Date();
        multimedia.fechaActualizacion = new Date();

        multimedia = await multimedia.save();
        res.send(multimedia);


    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }

});

//GET
router.get('/', async function(req, res) {
    try {
        const multimedias = await Multimedia.find().populate([
            { path: 'genero', select: 'estado' },
            { path: 'director', select: 'estado' },
            { path: 'productora', select: 'estado' },
            { path: 'tipo', select: 'nombre' }
        ]);
        res.send(multimedias);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

//UPDATE
router.put('/:multimediaId', [
    check('serial', 'El serial es obligatorio').not().isEmpty(),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('sinopsis', 'La sinopsis es obligatoria').not().isEmpty(),
    check('url', 'El URL es obligatorio').not().isEmpty(),
    check('imagenPortada', 'La imagen de portada es obligatoria').not().isEmpty(),
    check('añoEstreno', 'El año de estreno es obligatorio').not().isEmpty(),
    check('genero', 'El género es obligatorio').not().isEmpty(),
    check('director', 'El director es obligatorio').not().isEmpty(),
    check('productora', 'La productora es obligatoria').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let multimedia = await Multimedia.findById(req.params.multimediaId);
        if (!multimedia) {
            return res.status(400).send('Multimedia no encontrada');
        }

        const genero = await Genero.findById(req.body.genero);
        if (!genero || genero.estado !== 'Activo') {
            return res.status(400).send('El género no está activo o no existe');
        }

        const director = await Director.findById(req.body.director);
        if (!director || director.estado !== 'Activo') {
            return res.status(400).send('El director no está activo o no existe');
        }

        const productora = await Productora.findById(req.body.productora);
        if (!productora || productora.estado !== 'Activo') {
            return res.status(400).send('La productora no está activa o no existe');
        }

        const tipo = await Tipo.findById(req.body.tipo);
        if (!tipo) {
            return res.status(400).send('El tipo no existe');
        }

        // Actualizar instancia
        multimedia.serial = req.body.serial;
        multimedia.titulo = req.body.titulo;
        multimedia.sinopsis = req.body.sinopsis;
        multimedia.url = req.body.url;
        multimedia.imagenPortada = req.body.imagenPortada;
        multimedia.añoEstreno = req.body.añoEstreno;
        multimedia.genero = req.body.genero._id;
        multimedia.director = req.body.director._id;
        multimedia.productora = req.body.productora._id;
        multimedia.tipo = req.body.tipo._id;
        multimedia.fechaActualizacion = new Date();

        multimedia = await multimedia.save();
        res.send(multimedia);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

// DELETE
router.delete('/:multimediaId', async function(req, res) {
    try {
        // Buscar el documento Multimedia por su ID
        let multimedia = await Multimedia.findById(req.params.multimediaId);

        // Verifica si el registro existe
        if (!multimedia) {
            return res.status(404).send('Multimedia no encontrada');
        }

        // Eliminar el registro Multimedia
        await Multimedia.findByIdAndDelete(req.params.multimediaId);

        // Respuesta de éxito
        res.send({ message: 'Multimedia eliminada correctamente' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;