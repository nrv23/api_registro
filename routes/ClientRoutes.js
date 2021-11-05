const { Router } = require("express");
const router = Router();
const ClientController = require("../controllers/ClientController");
const clientController = new ClientController();

module.exports = () => {

    router.post('/cliente',clientController.addNewClient)
    router.get('/cliente/:cedula',clientController.getClient)

    return router;
}