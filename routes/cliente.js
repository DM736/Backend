const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');

router.post('/', clienteController.agregarClientes);
router.get('/', clienteController.mostrarClientes);
router.get('/:id', clienteController.buscarClientes);
router.delete('/:id', clienteController.eliminarClientes);
router.put('/:id', clienteController.actualizarClientes);
//router.patch('/:id', clienteController.cambioClientes);

module.exports = router 