const express = require('express');
const router1 = express.Router();
const {check} = require("express-validator");
const authController = require("../controller/authController")
const auth = require("../middleware/auth");

//"autenticar usuario  ruta: api/auth"

router1.post("/",
    [
        check("email", "agregar un email valido").isEmail(),
        check("password", "La contraseña debe tener minimo 10 caracteres").isLength({
            min: 10,
        }),
    ],
    authController.authenUsuario
);

router1.get('/', auth, authController.UserAutenticado);
module.exports = router1