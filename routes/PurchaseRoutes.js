const { Router } = require("express");
const router = Router();
const PurchaseController = require("../controllers/PurchaseController");
const purchaseController = new PurchaseController();

module.exports = () => {

    router.post('/compra',purchaseController.addPurchase);
    router.get('/compras/:cedula',purchaseController.getPurchases);

    return router;
}