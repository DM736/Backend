const express = require('express');
const router2 = express.Router();
const citaControl = require('../controller/citaController');

router2.post('/', citaControl.addCitas);
router2.get('/', citaControl.showCitas);
router2.get('/:id', citaControl.searCitas);
router2.delete('/:id', citaControl.delCitas);
router2.put('/:id', citaControl.updacCitas);
//router2.patch('/:id', comprasController.altUpdaCitas);


module.exports = router2