const Compras = require ('../models/Compras');


// funcion para agregar compras hechas CREATE
exports.addCompras = async(req, res) => {

    try {
        let compraa;
        compraa = new Compras(req.body);
        await compraa.save();
        res.send(compraa);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar el producto');
    }

}
//funcion para mostar las compras hechas 
exports.seeCompras = async(req, res) =>{
    try {
        const comp= await Compras.find();
        res.json(comp);
      } catch (error) {
        console.log(error)
        res.status(502).send("Error al mostrar los productos.");
      }
};
//funcion para mostrar una compra en especifico
exports.buscarCompra = async(req,res)=>{
    try {
        const comp = await Compras.findById(req.params.id);
        if(!comp){
            return res.status(404).json({ msg: "compra no encontada"});
        }
        res.send(comp); 
    } catch (error) {
        res.status(500).send("Error al consultar la compra");
    }
};

// funcion para eliminar compras
exports.eliminarCompra = async(req, res) =>{
    try {
        let comp = await Compras.findById(req.params.id);
        if(!comp){
            res.status(404).json({msg: "No hay registro de la compra"}) 
        }else{
            await Compras.findOneAndDelete({_id: req.params.id});
            res.json({msg: "El registro de compra ha sido eliminado"});
        }
    } catch (error) {
        res.status(500).send("El registro de compra no ha podido ser eliminado");
    }
}
//funcion para actualizar la compra
exports.actualizarCompra = async(req, res) =>{
    try {
        const {nombreComprador, numeroProductos, total, medioDPago, nombreTienda, fecha} = req.body
        let comp = await Compras.findById(req.params.id)
        if(!comp){
            res.status(404).json({msg: "No hay registro de la compra"});
            return
        }
            comp.nombreComprador = nombreComprador;
            comp.numeroProductos = numeroProductos;
            comp.total = total;
            comp.medioDPago = medioDPago;
            comp.nombreTienda = nombreTienda;
            comp.fecha = fecha;
            comp = await Compras.findOneAndUpdate({_id: req.params.id}, comp,{new: true});
            res.json(comp);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar la compra");
    }
}

exports.actualizarCompra = async(req,res)=>{
    try {
        const comp = await Compras.findOneAndUpdate({_id: req.params.id},req.body);
        if(!comp) res.status(404).send("Compra no encontrada");
        else
            res.json(comp);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar la compra");
    }
}

exports.cambioCompra = async(req,res)=>{
    try {
        const comp = await Compras.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!comp) res.status(404).send("Compra no encontrada");
            res.json(comp);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar la compra");
    }
}
