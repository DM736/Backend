const Cliente = require ('../models/Cliente');
// funcion para agregar clientes
exports.agregarClientes = async(req, res) => {

    try {
    let clientes = new Cliente(req.body);
    await clientes.save();
    res.send(clientes);

    } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al agregar un cliente');
    }

}
//funcion para mostar las Cliente hechas 
exports.mostrarClientes = async(req, res) =>{
    try {
        const cliente= await Cliente.find();
        res.json(cliente);
      } catch (error) {
        console.log(error)
        res.status(502).send("Error al mostrar el cliente.");
      }
};
//funcion para mostrar una cliente en especifico
exports.buscarClientes = async(req,res)=>{
    try {
        const cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            return res.status(404).json({ msg: "cliente no encontado"});
        }
        res.send(cliente); 
    } catch (error) {
        res.status(500).send("Error al consultar la cliente");
    }
};

// funcion para eliminar Cliente
exports.eliminarClientes = async(req, res) =>{
    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            res.status(404).json({msg: "No hay registro de la cliente"}) 
        }else{
            await Cliente.findOneAndDelete({_id: req.params.id});
            res.json({msg: "El registro de cliente ha sido eliminado"});
        }
    } catch (error) {
        res.status(500).send("El registro de cliente no ha podido ser eliminado");
    }
}
//funcion para actualizar el cliente
exports.actualizarClientes = async(req, res) =>{
    try {
        const {nombres, apellidos, cedula, correo, numeroContacto, nit,direccion} = req.body
        let cliente = await Cliente.findById(req.params.id)
        if(!cliente){
            res.status(404).json({msg: "No hay registro de la cliente"});
            return
        }
            cliente.nombres = nombres;
            cliente.apellidos = apellidos;
            cliente.cedula = cedula;
            cliente.correo = correo;
            cliente.numeroContacto = numeroContacto;
            cliente.nit = nit;
            cliente.direccion = direccion;
            cliente = await Cliente.findOneAndUpdate({_id: req.params.id}, cliente,{new: true});
            res.json(cliente);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar el cliente");
    }
}
//funcion para actualizar el cliente con metodo PUT
exports.actualizarClientes = async(req,res)=>{
    try {
        const cliente = await Cliente.findOneAndUpdate({_id: req.params.id},req.body);
        if(!cliente) res.status(404).send("cliente no encontrado");
        else
            res.json(cliente);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar el cliente");
    }
}
//funcion para actualizar cliente con metodo PATCH
exports.cambioClientes = async(req,res)=>{
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!cliente) res.status(404).send("cliente no encontrado");
            res.json(cliente);
    } catch (error) {
        res.status(500).send("hubo un error al actualizar el cliente");
    }
}