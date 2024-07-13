const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

exports.CreateUser = async(req, res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    const {email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: "El usuario ya existe"});
        }
        usuario = new Usuario(req.body)
        usuario.password = await bcryptjs.hash(password, 10);
        await usuario.save();

        const payload = {
            usuario: {id: usuario.id}
        }
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600, // una hora
            },
            (error, token)=>{
                if(error) throw error;

                res.json({token});
            }
        );
    } catch (error) {
        console.log("Hubo un error");
        console.log(error);
        res.status(400).send("hubo un error");
    }
}