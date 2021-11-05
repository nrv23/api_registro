const mysql = require("mysql2");
require("dotenv").config({path: '.env'});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  });

  connection.connect((err,conn) => {

    if(err) {
        console.log("Hubo un error al conectar la bd",err)

        throw err;
    }

    console.log("Conexión a la bd ha sido exitosa");

  })
  

  module.exports = connection;