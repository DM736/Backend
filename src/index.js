const express = require('express');
const ConectarDB = require('../config/db');
const cors = require('cors');

const app = express();
const port =process.env.PORT || 5000;

//enlazar la conexion a la base de datos
ConectarDB();
app.use(cors());
app.use(express.json({extended: true}));
app.use('/api/auth',require("../routes/authe"));
app.use('/api/usuarios', require("../routes/usuarios"));

app.use('/api/clientes', require('../routes/cliente'));
app.use('/api/compras', require('../routes/compra'));
app.use('/api/citas', require('../routes/cita'));

app.get('/',(req,res)=>{
    res.send("Bienvenido desde el navegador");
})
app.listen(port, () => console.log(`conectado al servidor con el puerto: `, port));