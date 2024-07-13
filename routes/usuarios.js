const express = require('express');
const router = express.Router();
const {check} = require("express-validator");
const usuarioController = require("../controller/userController")


router.post("/", 
    [
        check("nombre", "el nombre es obligatorio").not().isEmpty(),
        check("email","agregar un email valido").isEmail(),
        check("password", "El password debe tener minimo 10 caracteres").isLength({
            min: 10,
        }),
        check("registro", "El registro debe tener una fecha valida").isDate(),
    ],
        usuarioController.CreateUser
    );
    module.exports = router;