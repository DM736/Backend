const mongoose = require('mongoose');
require('dotenv').config();

const ConectarDB = ()=>{
  mongoose
  .connect(process.env.MONGO_URL)
  .then(()=>console.log("Conectado a MongoDB"))
  .catch((err)=> console.log(err));
}

module.exports = ConectarDB;