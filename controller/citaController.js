const Cita = require ('../models/Citas');
// funcion para agregar citas
exports.addCitas = async(req, res) => {

    try {
    let citas = new Cita(req.body);
    await citas.save();
    res.send(citas);

    } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al agregar la cita medica');
    }
}
//funcion para mostar las Cita hechas 
exports.showCitas = async(req, res) =>{
    try {
        const cita= await Cita.find();
        res.json(cita);
      } catch (error) {
        console.log(error)
        res.status(502).send("Error al mostrar la cita medica.");
      }
};
//funcion para mostrar una cita en especifico
exports.searCitas = async(req,res)=>{
    try {
        const cita = await Cita.findById(req.params.id);
        if(!cita){
            return res.status(404).json({ msg: "cita medica no encontada"});
        }
        res.send(cita); 
    } catch (error) {
        res.status(500).send("Error al consultar la cita medica");
    }  
};

// funcion para eliminar Cita
exports.delCitas = async(req, res) =>{
    try {
        let cita = await Cita.findById(req.params.id);
        if(!cita){
            res.status(404).json({msg: "No hay registro de la cita medica"}) 
        }else{
            await Cita.findOneAndDelete({_id: req.params.id});
            res.json({msg: "El registro de la cita medica ha sido eliminado"});
        }
    } catch (error) {
        res.status(500).send("El registro de la cita medica no ha podido ser eliminado");
    }
}
//funcion para actualizar la cita
exports.updacCitas = async(req, res) =>{
    try {
        const {entidad, especialidad, sede, costo, hora, fecha} = req.body
        let cita = await Cita.findById(req.params.id)
        if(!cita){
            res.status(404).json({msg: "No hay registro de la cita"});
            return
        }
            cita.entidad = entidad;
            cita.especialidad = especialidad;
            cita.sede = sede;
            cita.costo = costo;
            cita.hora = hora;
            cita.fecha = fecha;
            cita = await Cita.findOneAndUpdate({_id: req.params.id}, cita,{new: true});
            res.json(cita);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar la cita medica");
    }
}
//funcion para actualizar el cita con metodo PUT
exports.updatCitas = async(req,res)=>{
    try {
        const cita = await Cita.findOneAndUpdate({_id: req.params.id},req.body);
        if(!cita) res.status(404).send("cita medica no encontrada");
        else
            res.json(cita);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar la cita medica");
    }
}
//funcion para actualizar cita con metodo PATCH
exports.altUpdaCitas = async(req,res)=>{
    try {
        const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!cita) res.status(404).send("cita medica no encontrada");
            res.json(cita);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar la cita medica");
    }
}