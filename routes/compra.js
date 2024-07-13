const express = require('express');
const router1 = express.Router();
const comprasController = require('../controller/comprasController');

router1.post('/', comprasController.addCompras);
router1.get('/', comprasController.seeCompras);
router1.get('/:id', comprasController.buscarCompra);
router1.delete('/:id', comprasController.eliminarCompra);
router1.put('/:id', comprasController.actualizarCompra);
//router1.patch('/:id', comprasController.cambioCompra);


module.exports = router1