const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenUsuario = async (req, res) =>{

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    const {email, password} = req.body;
    try{
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: "El usuario no existe"});
        } 

        const passVali = await bcryptjs.compare(password, usuario.password);
        if(!passVali){
            return res.status(400).json({msg: "Contraseña incorrecta"});
        }
        const payload ={
            usuario: {id: usuario.id},        
        }
        jwt.sign(
            payload, process.env.SECRETA,
            {
                expiresIn: 3600,
            },
            (error, token)=>{
                if(error) throw error;

                res.json({token});
            }
        );
    } catch (error){
        console.log("Hubo un error");
        console.log(error);
        res.status(400).send("hubo un error");
    }
};

exports.UserAutenticado = async (req,res)=>{
    try{
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});

    } catch(error){
        res.status(500).json({msg: "Hubo un error"})
    }
}
