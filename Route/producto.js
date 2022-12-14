const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const Producto = require('../Controller/producto');
const { validaAccesoToken } = require('../middlewares/jwtValidador');
const { validadorCampos } = require('../middlewares/validadorCampos');
const { productoRepetidoValidador } = require('../helpers/validadorBD');
const producto = new Producto();

router.use(validaAccesoToken)

router.get('/',( req , res ) =>{ producto.getAllProducto( req, res ) });

router.get('/:id', [
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ], ( req , res ) =>{ producto.getProducto( req, res ) });

router.post('/',[
    check('nombreProducto', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('nombreProducto').custom(productoRepetidoValidador),
    validadorCampos
    ],( req , res ) =>{ producto.postProducto( req, res ) });

router.put('/:id', [
    check('id','no es un id mongodb').isMongoId(),
    check('nombreProducto').custom(productoRepetidoValidador),
    validadorCampos
    ] ,( req , res ) =>{ producto.putProducto( req, res ) });

router.delete('/:id', [
    check('id','no es un id mongodb').isMongoId(),
    validadorCampos
    ] ,( req , res ) =>{ producto.deleteProducto( req, res ) });

module.exports = router;