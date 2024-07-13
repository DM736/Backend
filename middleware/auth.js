const jwt = require ("jsonwebtoken");
module.exports = function(req, res, next){
    const token = req.header("x-auth-token")
//revision del token
    if(!token){
        return res.status(400).json({msg: "No hay token permiso invalido"})
    }
    //validar token
    try {
    const cypher = jwt.verify(token, process.env.SECRETA);
    req.usuario = cypher.usuario;
    next();
    } catch (error) {
        res.status(400).json({msg: "token no valido"})
    }
}