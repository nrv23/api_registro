const express = require("express");
const app = express();
const http = require('http');
const cors = require("cors");
const ClientRoutes = require("./routes/ClientRoutes");
const PurchaseRoutes = require("./routes/PurchaseRoutes");
const noEncontrado = require("./routes/404");

app.use(express.json()); //leer el body del objeto request
app.use(cors()); 

//------------------------- cargar rutas de la API ---------------------------------

app.use('/api', ClientRoutes());
app.use('/api', PurchaseRoutes());
app.use((req, res) =>{ // agregar ruta cuando la busqueda no encuentre un recurso
	return noEncontrado(req,res);
});

//--------------------------- Ejecutar servidor ----------------------------------------------

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log("Servidor en línea")
    console.log(`Escuchando peticiones por el puerto ${PORT}` )
})
